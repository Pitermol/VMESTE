import React, { useEffect, useState } from "react";
import "./Feed.css";
import ReactDOM from 'react-dom';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../components/header/Header.js';
import subs from "../../static/my_profile_vct1.svg";
import like from "../../static/like.svg";
import back2 from "../../static/my_profile_img2.png";
import back3 from "../../static/my_profile_img3.png";
import cross_img from "../../static/black_cross.png";
import places_visited from "../../static/my_profile_vct2.svg";
import top_place from "../../static/my_profile_vct3.svg";
import Footer from "../../components/footer/Footer.js";
import { Map, YMaps, Placemark } from '@pbe/react-yandex-maps';

const cookies = new Cookies();

const PostItem = (post) => {
    const [nickname, setNickname] = useState("");
    const [isLiked, setIsLiked] = useState(post.post.likes.includes(cookies.get("uid")));
    axios.get("http://localhost:3010/api/get_public_info", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': '123qwe',
            'uid': post.post["post_owner"]
        }
    }).then(response => {
        if ((Object.keys(response).length != 0) && (Object.keys(response.data).length != 0)) {
            if (response.data["status"] == 1) {
                alert("Ошибка на стороне сервера");
            } else {
                setNickname(response.data.nickname == "" ? response.data.login : response.data.nickname);
            }
        }
    }).catch(function (error) {
        if (error.response) {
            alert("Ошибка " + String(error.response.status));
        }
    });

    const onLikeClick = (e) => {
        let likes_amount;
        let likes_container;
        if ((e.target.className == "likes_liked") || (e.target.className == "likes_unliked")) {
            likes_container = e.target;
            likes_amount = e.target.children[1];
        } else if (e.target.className == "like_img") {
            likes_amount = e.target.nextSibling;
            likes_container = e.target.parentElement;
        } else {
            likes_amount = e.target;
            likes_container = e.target.parentElement;
        }
        console.log(likes_container.style["background-color"]);
        if (!isLiked) {
            setIsLiked(true);
            likes_amount.textContent = String(parseInt(likes_amount.textContent) + 1);
            likes_container.style["background-color"] = "#E99371";

            var data = {post_id: post.post["post_id"], post_owner: post.post["post_owner"], uid:cookies.get("uid"), is_plus: true};
            axios.post( "http://localhost:3010/api/like_post", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        } else {
            setIsLiked(false);
            likes_amount.textContent = String(parseInt(likes_amount.textContent) - 1);
            likes_container.style["background-color"] = "#E0E786";

            var data = {post_id: post.post["post_id"], post_owner: post.post["post_owner"], uid: cookies.get("uid"), is_plus: false};
            axios.post( "http://localhost:3010/api/like_post", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        }
    }
    return (
        <div className="feed_post_item_wrapper">
            <div className="all_post_item_container">
                <Link style={{marginLeft: "40px", marginBottom: "350px", fontSize: "35px"}} to={`/users_profile/${post.post["post_owner"]}`}>{nickname}</Link>
                <div style={{marginLeft: "80px"}}>
                    <Map height={400} width={500} defaultState={{ center: [post.post["location"].x, post.post["location"].y], zoom: 3 }} >
                        <Placemark
                            geometry={[post.post["location"].x, post.post["location"].y]}
                            options={{
                                zIndex: 100
                            }}
                        />
                    </Map>
                </div>
                <h className="feed_post_text">{post.post["text"]}</h>
                <div className={post.post.likes.includes(cookies.get("uid")) ? "likes_liked" : "likes_unliked"} onClick={onLikeClick}>
                    <img className="like_img" src={like} width="48px" style={{marginLeft: "10px", userSelect: "none"}}></img>
                    <h style={{marginLeft: "10px", userSelect: "none", paddingBottom: "3px"}}>{post.post["likes"].length}</h>
                </div>
            </div>
        </div>
    )
}

class Feed extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPostEnd: -7,
            isEnd: false,
            posts: [],
            isLoading: false
        }
        this.get_new = this.get_new.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.onNavClick = this.onNavClick.bind(this);
        this.get_new(-7);

        document.addEventListener('scroll', this.scrollHandler);
    }
    
    get_new = (number) => {
        if (!this.state.isEnd) {
            this.setState({isLoading: true});
            console.log(number);
            axios.get("http://localhost:3010/api/get_last_posts", {headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe',
                'start': number
            }}).then(response => {
                if (response.data["data"].length === 0) {
                    this.setState ({
                        isEnd: true,
                        isLoading: false
                    })
                } else {
                    this.setState ({
                        currentPostEnd: number + 7,
                        posts: this.state.posts.concat(response.data["data"]),
                        isLoading: false
                    })
                }
            }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        }
    }

    scrollHandler = (e) => {
        console.log(this.state.currentPostEnd)
        if((e.target.documentElement.scrollHeight-e.target.documentElement.scrollTop-window.innerHeight < 180) && (!this.state.isLoading) && (!this.state.isEnd))
        {
            this.get_new(this.state.currentPostEnd + 7);
            console.log(9999999);
        }
    }

    onNavClick(e) {
        console.log(this.state.posts);
        if (e.target.className == "nav_icon") {
            e.target.className = "nav_icon_active";
            var elem = ReactDOM.findDOMNode(document.getElementsByClassName("menu")[0]);
            elem.classList.toggle("menu_out");
        } else if (e.target.className == "nav_icon_active") {
            e.target.className = "nav_icon";
            var elem = ReactDOM.findDOMNode(document.getElementsByClassName("menu")[0]);
            elem.classList.remove("menu_out");
        } else {
            var elem = ReactDOM.findDOMNode(document.getElementById("nav_icon_id"));
            if (elem.className == "nav_icon") {
                elem.className = "nav_icon_active";
                var elem = ReactDOM.findDOMNode(document.getElementsByClassName("menu")[0]);
                elem.classList.toggle("menu_out");
            } else {
                elem.className = "nav_icon";
                var elem = ReactDOM.findDOMNode(document.getElementsByClassName("menu")[0]);
                elem.classList.remove("menu_out");
            }
        }
    }

    render() {
        return (
            <div>
                <Header isMain={false} />
                <ul className="menu">
                    <li className="menu_item">
                        <Link to="/my_profile" style={{height: "40px", width: "200px", display: "flex", alignItems: "center", color: "black"}}>
                            Мой профиль
                        </Link>
                    </li>
                    <li className="menu_item">
                        <Link to="/feed" style={{height: "40px", width: "200px", display: "flex", alignItems: "center", color: "black"}}>
                            Главная
                        </Link>
                    </li>
                </ul>
                <div id="nav_icon_id" className="nav_icon" onClick={this.onNavClick}>
                    <span className="bar_big"></span>
                    <span className="bar_small1"></span>
                    <span className="bar_small2"></span>
                    <span className="bar_big"></span>
                </div>

                <div className='all_posts_list'>
                    <YMaps>
                        {this.state.posts?.map(post => <PostItem post={post}/>)}
                    </YMaps>
                </div>
            </div>
        );
    }
}

export default Feed;

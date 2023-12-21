import React from "react";
import "./users_profile.css";
import ReactDOM from 'react-dom';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../components/header/Header.js';
import subs from "../../static/subs_img.jpg";
import places_visited from "../../static/places_visited_img.svg";
import top_place from "../../static/top_place_img.jpg";
import Footer from "../../components/footer/Footer.js";
import checkmark from "../../static/checkmark.png";

const cookies = new Cookies();


class UsersProfileClass extends React.Component {
    constructor(props) {
        super(props);
        const navigate = this.props.navigate;
        this.state = {
            uid: -1,
            nickname: "",
            login: "",
            avatar: undefined,
            subs_amount: 0,
            posts_amount: 0,
            top_place: 0,
            if_subscribed: false
        }
        var config;
        if ("jwt" in cookies.getAll()) {
            var jwt = cookies.get("jwt");
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${jwt}`
                }
            }
            axios.get( "http://localhost:3010/api/checkjwt", config ).then(response => {
                if ((Object.keys(response).length != 0) && (Object.keys(response.data).length != 0)) {
                    if (response.data["status"] == 1) {
                        navigate("/login", { replace: true });
                    } else {
                        console.log(response.data.data.data.uid);
                        this.setState({uid: response.data.data.data.uid});
                    }
                }
            }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        } else {
            navigate("/login", { replace: true });
        }

        config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe',
                'uid': parseInt(window.location.pathname.split("/")[2])
            }
        }
        axios.get("http://localhost:3010/api/get_public_info", config).then(response => {
            if ((Object.keys(response).length != 0) && (Object.keys(response.data).length != 0)) {
                if (response.data["status"] == 1) {
                    alert("Ошибка на стороне сервера");
                } else {
                    this.setState({ login: response.data.login, nickname: response.data.nickname, avatar: response.data.avatar, subs_amount: response.data.subs, posts_amount: response.data.posts, top_place: response.data.place });
                }
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });

        this.config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe'
            }
        }
        var data = { target: parseInt(window.location.pathname.split("/")[2]), subscriber: cookies.get("uid") }
        axios.post( "http://localhost:3010/api/check_if_subscribed", data, this.config).then(response => {
            if (response.data["if_subscribed"] == true) {
                this.setState({if_subscribed: true})
            } else {
                this.setState({if_subscribed: false})
            }
        }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        
        
        this.subscribe = this.subscribe.bind(this);
        // this.onTextChange = this.onTextChange.bind(this);
    }

    onNavClick(e) {
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

    subscribe() {
        if (ReactDOM.findDOMNode(document.getElementById("subscribe_btn")).style.backgroundColor == "rgb(218, 190, 94)") {
            this.config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }
            var data = { target: parseInt(window.location.pathname.split("/")[2]), subscriber: this.state.uid }
            axios.post( "http://localhost:3010/api/unsubscribe", data, this.config).then(response => console.log(response)).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        ReactDOM.findDOMNode(document.getElementById("subscribe_btn")).innerHTML = `Подписаться`;
        ReactDOM.findDOMNode(document.getElementById("subscribe_btn")).style.backgroundColor = "#D9D9D9";
        } else {
            this.config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }
            var data = { target: parseInt(window.location.pathname.split("/")[2]), subscriber: this.state.uid }
            axios.post( "http://localhost:3010/api/subscribe", data, this.config).then(response => console.log(response)).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
            ReactDOM.findDOMNode(document.getElementById("subscribe_btn")).innerHTML = `<img src=${checkmark} width="30px"></img> <h style="margin-left: 5px">Вы подписаны</h>`;
            ReactDOM.findDOMNode(document.getElementById("subscribe_btn")).style.backgroundColor = "#DABE5E";
        }
    }

    render() {
        return (
            <div className="foreign_profie_wrap">
                <Header isMain={false} />
                <ul className="menu">
                    <li className="menu_item">
                        Главная
                    </li>
                    <li className="menu_item">
                        Сообщения
                    </li>
                    <li className="menu_item">
                        Настройки
                    </li>
                </ul>
                
                <div id="nav_icon_id" className="nav_icon" onClick={this.onNavClick}>
                    <span className="bar_big"></span>
                    <span className="bar_small1"></span>
                    <span className="bar_small2"></span>
                    <span className="bar_big"></span>
                </div>
                <div className="users_profile_wrapper1">
                    <div className="last_post_block">
                        <h>
                            Последнее путешествие
                        </h>
                        <div style={{width: "350px", height: "300px", backgroundColor: "black", marginTop: "30px"}}></div>
                        <button className="last_post_btn">
                            Подробнее
                        </button>
                    </div>
                    <div className="users_profile_info">
                        <div className="users_profile_info_1">
                            {/* <img></img> */}
                            <div style={{width: "180px", height: "180px", backgroundColor: "black"}}></div>
                            <div className="users_profile_info_block">
                                <div className="users_profile_info_block_top">
                                    <h id="users_profile_name">{(this.state.nickname === null) ? this.state.login : this.state.nickname}</h>
                                </div>
                                <div className="users_profile_info_block_part">
                                    <img src={subs} width="30px"/>
                                    <h id="users_profile_subs">{this.state.subs_amount}</h>
                                </div>
                                <div className="users_profile_info_block_part">
                                    <img src={places_visited} width="30px"/>
                                    <h id="users_profile_subs">{this.state.posts_amount}</h>
                                </div>
                                <div className="users_profile_info_block_part" style={{paddingLeft: "7px"}}>
                                    <img src={top_place} width="39px"/>
                                    <h id="users_profile_subs" style={{marginRight: "5px"}}>{this.state.top_place}</h>
                                </div>
                            </div>
                        </div>
                        <div className="users_profile_info_2">
                            <button onClick={this.subscribe} id="subscribe_btn" style={{backgroundColor: !this.state.if_subscribed ? "#D9D9D9" : "#DABE5E"}}>
                                {!this.state.if_subscribed && <h>Подписаться</h>}
                                {this.state.if_subscribed && <div><img src={checkmark} width="30px"></img><h style={{marginLeft: "5px"}}>Вы подписаны</h></div>}
                            </button>
                            <button className="msg_to_this_user">
                                Написать сообщение
                            </button>
                            <button className="check_users_posts">
                                Посмотреть посты
                            </button>
                            <div className="users_profile_achs_block">
                                <div className="users_profile_achs_block_top">
                                    <h style={{fontSize: "22px", fontWeight: "600", color: "#FFFDC7"}}>Особые награды</h>
                                </div>
                                {/* <div className="users_profile_info_block_part">
                                    <img src={subs} width="30px"/>
                                    <h id="users_profile_subs">1241</h>
                                </div>
                                <div className="users_profile_info_block_part">
                                    <img src={places_visited} width="30px"/>
                                    <h id="users_profile_subs">21</h>
                                </div>
                                <div className="users_profile_info_block_part" style={{paddingLeft: "7px"}}>
                                    <img src={top_place} width="39px"/>
                                    <h id="users_profile_subs" style={{marginRight: "5px"}}>1</h>
                                </div> */}
                            </div>
                        </div>
                        <div className="users_profile_gallery_block">
                            <h>Галерея</h>
                            {/* <img></img> */}
                            <div style={{width: "140px", height: "180px", backgroundColor: "black", marginTop: "22.8px"}}></div>
                            {/* <img></img> */}
                            <div style={{width: "140px", height: "180px", backgroundColor: "black", marginTop: "20px"}}></div>
                        </div>
                    </div>
                </div>
                <div className="users_profile_posts">
                        <h>Все места meister:</h>
                        <table className="users_posts_table">
                            
                        </table>
                </div>
                <Footer style={{backgroundColor: "#FFFDC7", marginTop: "30px"}} />
            </div>
        )
    }
}

export default function UsersProfile() {
    const navigate = useNavigate();
    const params = useParams();
  
    return <UsersProfileClass navigate={navigate} uid={params.userId}/>;
  }

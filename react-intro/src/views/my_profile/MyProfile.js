import React from "react";
import "./MyProfile.css";
import ReactDOM from 'react-dom';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../components/header/Header.js';
import subs from "../../static/my_profile_vct1.svg";
import back1 from "../../static/my_profile_img1.png";
import back2 from "../../static/my_profile_img2.png";
import back3 from "../../static/my_profile_img3.png";
import cross_img from "../../static/black_cross.png";
import places_visited from "../../static/my_profile_vct2.svg";
import top_place from "../../static/my_profile_vct3.svg";
import Footer from "../../components/footer/Footer.js";
import { Map, YMaps, Placemark } from '@pbe/react-yandex-maps';

const cookies = new Cookies();


class UsersProfileClass extends React.Component {
    constructor(props) {
        super(props);
        const navigate = this.props.navigate;
        this.state = {
            uid: -1,
            coordinates: [],
            nickname: "",
            login: "",
            avatar: undefined,
            subs_amount: 0,
            posts_amount: 0,
            top_place: 0,
            avatar_src: undefined,
            avatar_width: 0,
            avatar_height: 0
        }
        var config;

        if ("jwt" in cookies.getAll()) {
            var jwt = cookies.get("jwt");
            console.log(jwt);
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${jwt}`
                }
            }
            axios.get( "http://localhost:3010/api/checkjwt", config ).then(response => {
                console.log(response);
                if ((Object.keys(response).length != 0) && (Object.keys(response.data).length != 0)) {
                    if (response.data["status"] == 1) {
                        navigate("/login", { replace: true });
                    } else {
                        this.setState({uid: response.data.data});
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
                'uid': cookies.get("uid")
            }
        }
        axios.get("http://localhost:3010/api/get_public_info", config).then(response => {
            if ((Object.keys(response).length != 0) && (Object.keys(response.data).length != 0)) {
                if (response.data["status"] == 1) {
                    alert("Ошибка на стороне сервера");
                } else {
                    this.setState({ login: response.data.login, nickname: response.data.nickname, subs_amount: response.data.subs, posts_amount: response.data.posts, top_place: response.data.place });
                }
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        if (this.state.avatar == undefined) {
            axios.get(`http://localhost:3010/api/get_avatar`, {
                headers: {
                uid: cookies.get("uid"),
                },
                responseType: 'blob',
            })
            .then((response) => {
                const blob = new Blob([response.data]);
                this.changeAvatar(blob);
            })
            .catch((error) => {
                console.error('Ошибка загрузки файла:', error);
            });
        }
        
        this.logout = this.logout.bind(this);
        this.create_post = this.create_post.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
    }

    changeAvatar = (file) => {
        var file_url = window.URL.createObjectURL(file);
        this.setState({ avatar_src: file_url });
        const img = new Image();
        img.src = file_url;
        img.onload = () => {
            this.setState({ avatar_width: img.width, avatar_height: img.height })
        }
    }

    open_creating(e) {
        ReactDOM.findDOMNode(document.getElementById("img1")).removeAttribute("hidden");
        ReactDOM.findDOMNode(document.getElementById("maps_block")).removeAttribute("hidden");
        ReactDOM.findDOMNode(document.getElementById("post_text_input")).removeAttribute("hidden");
        ReactDOM.findDOMNode(document.getElementById("post_onReady_btn")).style.visibility = "visible";
        var elem = ReactDOM.findDOMNode(document.getElementById("post_creation"));
        if (elem != undefined) {
            elem.id = "post_creation_opened";
        }
    }
    hide_creating() {
        ReactDOM.findDOMNode(document.getElementById("img1")).setAttribute("hidden", true);
        ReactDOM.findDOMNode(document.getElementById("maps_block")).setAttribute("hidden", true);
        ReactDOM.findDOMNode(document.getElementById("post_text_input")).setAttribute("hidden", true);
        ReactDOM.findDOMNode(document.getElementById("post_onReady_btn")).style.visibility = "hidden";
        var elem = ReactDOM.findDOMNode(document.getElementById("post_creation_opened"));
        if (elem != undefined) {
            elem.id = "post_creation";
        }
    }
    logout(e) {
        cookies.set("jwt", "", { path: "/", sameSite: "strict" });
        this.props.navigate("/login", { replace: true });
    }
    create_post(e) {
        var text = ReactDOM.findDOMNode(document.getElementById("post_text_input")).value;
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe'
            }
        }
        var data = {uid: cookies.get("uid"), text: text, coords: this.state.coordinates};
        axios.post( "http://localhost:3010/api/create_post", data, config).then(response => {
            if (response.data["status"] == 1) {
                alert("Произошла ошибка на стороне сервера");
            } else {
                this.setState({coordinates: []});
                ReactDOM.findDOMNode(document.getElementById("post_text_input")).value = "";
                this.hide_creating();
            }
            }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
    }

    render() {
        return (
            <div className="foreign_profie_wrap">
                <img src={back1} style={{position: "absolute", top: "130px", left: "10px", rotate: "178.33 deg", zIndex: 0, width: "470px"}}/>
                <img src={back2} style={{position: "absolute", top: "130px", left: "470px", zIndex: 0, width: "480px"}}/>
                <img src={back3} style={{position: "absolute", top: "550px", left: "950px", zIndex: 0, width: "280px"}}/>
                <Header isMain={false} />
                <div className="my_profile_wrapper1">
                    <div className="my_profile_info" style={{zIndex: 1}}>
                        <div style={{display: "inline-flex"}}>
                            <div className="my_profile_info_1" style={{marginLeft: "70px"}}>
                                <div style={{width: "180px", height: "200px", marginLeft: "20px", display: "block", alignItems: "center"}}>
                                    <img src={this.state.avatar_src} style={{display: "block", verticalAlign: "top", maxWidth: "100%", maxHeight: "100%"}} width={this.state.avatar_width > this.state.avatar_height ? "100%" : "auto"} height={this.state.avatar_width <= this.state.avatar_height ? "100%" : "auto"} />
                                </div>
                                {/* <img></img> */}
                                {/* <div style={{width: "220px", height: "250px", backgroundColor: "black"}}></div> */}
                                <div className="my_profile_info_block">
                                    <div className="my_profile_info_block_top">
                                        <h id="my_profile_name">{(this.state.nickname == "") ? this.state.login : this.state.nickname}</h>
                                    </div>
                                    <div className="my_profile_info_block_part">
                                        <img src={subs} width="30px"/>
                                        <h id="my_profile_subs">{this.state.subs_amount}</h>
                                    </div>
                                    <div className="my_profile_info_block_part">
                                        <img src={places_visited} width="30px"/>
                                        <h id="my_profile_places">{this.state.posts_amount}</h>
                                    </div>
                                    <div className="my_profile_info_block_part">
                                        <img src={top_place} width="39px"/>
                                        <h id="my_profile_top" style={{marginRight: "5px"}}>{this.state.top_place}</h>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="my_profile_gallery_block">
                                <h>Галерея</h>
                                <div style={{width: "140px", height: "180px", backgroundColor: "black", marginTop: "40px"}}></div>
                                <div style={{width: "140px", height: "180px", backgroundColor: "black", marginTop: "20px"}}></div>
                            </div> */}
                        </div>
                        <Link to="/change_profile">
                            <button className="change_profile_btn">Изменить профиль</button>
                        </Link>
                    </div>
                    <div className="my_last_post_block" style={{zIndex: 1}}>
                        <h>
                            Последнее путешествие
                        </h>
                        <div style={{width: "350px", height: "300px", backgroundColor: "black", marginTop: "30px"}}></div>
                        {/* <button className="last_post_btn">
                            Подробнее
                        </button> */}
                        <button className="create_post_btn" onClick={this.open_creating}>
                            Создать пост
                        </button>
                    </div>
                    <div className="profile_menu">
                        {/* <button className="profile_menu_btn">Сообщения</button>
                        <button className="profile_menu_btn">Уведомления</button>
                        <button className="profile_menu_btn">Подписчики</button>
                        <button className="profile_menu_btn">Подписки</button>
                        <button className="profile_menu_btn">Рейтинг</button> */}
                        <button className="profile_menu_btn" style={{backgroundColor: "#60D9FF"}} onClick={() => document.location.replace("https://aviasales.ru")}>Купить билеты</button>
                        {/* <button className="profile_menu_btn">Мои награды</button>
                        <button className="profile_menu_btn">Настройки</button> */}
                        <button className="profile_menu_btn" onClick={this.logout}>Выйти из аккаунта</button>
                    </div>
                </div>
                <div id="post_creation">
                    <div id="maps_block" hidden>
                        <YMaps>
                            <Map height={360} width={400} onClick={e => {this.setState({coordinates: e.get("coords")}); console.log(this.state)}} defaultState={{ center: [55.75, 37.57], zoom: 9, cursor: "pointer" }} >
                                {(this.state.coordinates.length != 0) && <Placemark
                                    geometry={this.state.coordinates}
                                    options={{
                                    zIndex: 100
                                    }}
                                />}
                            </Map>
                        </YMaps>
                    </div>
                    <div id="post_input">
                        <textarea hidden type="text" id="post_text_input" cols="50" rows="7" ></textarea>
                        <button onClick={this.create_post} style={{visibility: "hidden"}} id="post_onReady_btn">Готово</button>
                    </div>
                    <img src={cross_img} id="img1" onClick={this.hide_creating} hidden width="30px" height="30px" style={{marginLeft: "20px", marginRight: "20px", marginTop: "30px", cursor: "pointer"}}/>
                </div>
                <div className="my_profile_posts">
                        <h>Мои места:</h>
                        <table className="my_posts_table">
                            
                        </table>
                </div>
                <Footer style={{backgroundColor: "#FFFDC7", marginTop: "30px"}} />
            </div>
        )
    }
}

export default function UsersProfile() {
    const navigate = useNavigate();

    return <UsersProfileClass navigate={navigate}/>;
  }

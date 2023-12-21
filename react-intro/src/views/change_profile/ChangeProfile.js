import React, { useEffect } from "react";
import "./ChangeProfile.css";
import ReactDOM, { render } from 'react-dom';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Header from '../../components/header/Header.js';
import places_visited from "../../static/my_profile_vct2.svg";
import top_place from "../../static/my_profile_vct3.svg";
import Footer from "../../components/footer/Footer.js";
import { Map, YMaps, Placemark } from '@pbe/react-yandex-maps';
import cross from "../../static/cross.png";
import checkmark from "../../static/checkmark.png";

const cookies = new Cookies();


function DragNDrop() {
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          this.setState({ dragActive: true });
        } else if (e.type === "dragleave") {
            this.setState({ dragActive: false });
        }
      };

    handleFile = (files) => {
        var file = files[0];
        if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
            ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "opened";
            this.effect(() => {
                const timer = setTimeout(() => {
                    ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "closed";
                }, 2000);
                return () => clearTimeout(timer);
            }, []);
        } else {
            // file.
        }
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragActive: false });
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleFile(e.dataTransfer.files);
        }
    };

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            this.handleFile(e.target.files);
        }
    };
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          this.setState({ dragActive: true });
        } else if (e.type === "dragleave") {
            this.setState({ dragActive: false });
        }
      };

    handleFile = (files) => {
        var file = files[0];
        if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
            ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "opened";
            this.effect(() => {
                const timer = setTimeout(() => {
                    ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "closed";
                }, 2000);
                return () => clearTimeout(timer);
            }, []);
        } else {
            // file.
        }
    };

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragActive: false });
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleFile(e.dataTransfer.files);
        }
    };

    handleChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            this.handleFile(e.target.files);
        }
    };
    return(
        <div style={{display: "flex", flexDirection: "column"}}>
            <form id="form-file-upload" onDragEnter={this.handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input type="file" id="input-file-upload" accept="image/png, image/jpg, image/jpeg" multiple={false} onChange={this.handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={this.state.dragActive ? "drag-active" : "" }>
                    <div>
                        <p>Перенесите ваш файл сюда или</p>
                        <p>нажмите чтобы загрузить</p>
                    </div> 
                </label>
                { this.state.dragActive && <div id="drag-file-element" onDragEnter={this.handleDrag} onDragLeave={this.handleDrag} onDragOver={this.handleDrag} onDrop={this.handleDrop}></div> }
            </form>
            <div id="wrong_file_type" className="closed">
                <img src={cross} width="50px" />
                <h>Неверное расширение файла, возможные расширения: png, jpg, jpeg</h>
            </div>
        </div>
    )
}

class ChangeProfileClass extends React.Component {
    constructor(props) {
        super(props);
        const navigate = this.props.navigate;
        this.effect = this.props.effect;
        this.state = {
            uid: this.props.uid,
            coordinates: [],
            nickname: "",
            login: "",
            avatar: undefined,
            subs_amount: 0,
            posts_amount: 0,
            top_place: 0,
            dragActive: false
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
            axios.get( "http://localhost:3010/api/checkjwt", config ).then(function(response) {
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
                    this.setState({ login: response.data.login, nickname: response.data.nickname, avatar: response.data.avatar, subs_amount: response.data.subs, posts_amount: response.data.posts, top_place: response.data.place });
                }
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    

    render() {
        return (
            <div className="change_profile_wrap">
                <Header isMain={false} />
                <ul className="menu">
                    <li className="menu_item">
                        Мой профиль
                    </li>
                    <li className="menu_item">
                        Главная
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
                <div className="change_profile_main">
                    <div className="change_profile_main_block">
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                    </div>
                    <div className="change_profile_main_block">
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                        <h className="change_profile_label"></h>
                        <input className="change_profile_input" />
                    </div>
                    <div className="change_profile_main_block" style={{alignItems: "center", marginLeft: "90px"}}>
                        <div style={{backgroundColor: "black", width: "120px", height: "150px"}}></div>
                        {/* <img></img> */}
                        {/* TODO: avatar img, dragndrop */}
                        
                    </div>
                </div>
                <div className="save_profile_block">
                    {/* <img>checkmark</img> */}
                    {/* <h>Сохранено</h> */}
                    <button className="save_profile_btn">Сохранить</button>
                </div>
                <Footer style={{backgroundColor: "#FFFDC7", marginTop: "30px"}} />
            </div>
        )
    }
}

export default function ChangeProfile() {
    const navigate = useNavigate();
    const effect = useEffect;
  
    return <ChangeProfileClass navigate={navigate} effect={effect}/>;
  }

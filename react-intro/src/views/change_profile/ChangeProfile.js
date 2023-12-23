import React, { useEffect, useState } from "react";
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
import { saveAs } from 'file-saver';

const cookies = new Cookies();
cookies.set("avatar", undefined);


const DragNDrop = (props) => {
    const [dragActive, setDragActive] = React.useState(false);
    
    function handleDrag (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFile = files => {
        var file = files[0];
        if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
            ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "opened";
            const timer = setTimeout(() => {
                ReactDOM.findDOMNode(document.getElementById("wrong_file_type")).className = "closed";
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            console.log(file);
            props.changeAvatarFunc(file)
        }
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    function handleChange(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };
    
    return(
        <div style={{display: "flex", flexDirection: "column", zIndex: 0}}>
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input type="file" id="input-file-upload" accept="image/png, image/jpg, image/jpeg" multiple={false} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <div>
                        <p>Перенесите ваш файл сюда или</p>
                        <p>нажмите чтобы загрузить</p>
                    </div> 
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
            <div id="wrong_file_type" className="closed">
                <img src={cross} width="50px" />
                <h style={{width: "340px"}}>Неверное расширение файла, возможные расширения: png, jpg, jpeg</h>
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
            first_name: "",
            last_name: "",
            avatar: undefined,
            subs_amount: 0,
            posts_amount: 0,
            top_place: 0,
            dragActive: false,
            avatar_src: undefined,
            avatar_width: 0,
            avatar_height: 0,
            cur_password: "",
            new_password1: "",
            new_password2: "",
            req1: false,
            req2: false,
            req3: false,
            avatar_file: undefined
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
                    this.setState({ login: response.data.login, nickname: response.data.nickname, first_name: response.data.first_name, last_name: response.data.last_name, subs_amount: response.data.subs, posts_amount: response.data.posts, top_place: response.data.place });
                }
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        
        this.changeAvatar = this.changeAvatar.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.save = this.save.bind(this);

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

    changeAvatar = (file) => {
        console.log(file);
        var file_url = window.URL.createObjectURL(file);
        this.setState({ avatar_src: file_url, avatar_file: file });
        const img = new Image();
        img.src = file_url;
        img.onload = () => {
            this.setState({ avatar_width: img.width, avatar_height: img.height })
        }
    }

    checkPassword = (pass) => {
        let status = {len: false, bigIn: false, numIn: false};
        let r1 = new RegExp("[A-ZА-Я]");
        let r2 = new RegExp("[0-9]");
        if (pass.length >= 8){
            status["len"] = true;
        }
        if (r1.test(pass)) {
            status["bigIn"] = true;
        }
        if (r2.test(pass)) {
            status["numIn"] = true;
        }
        this.setState({req1: status.len, req2: status.bigIn, req3: status.numIn})
        return status;
    }

    handleInput = (e) => {
        if (e.target.id == "input_nickname") {
            this.setState({ nickname: e.target.value })
        } else if (e.target.id == "input_first_name") {
            this.setState({ first_name: e.target.value })
        } else if (e.target.id == "input_last_name") {
            this.setState({ last_name: e.target.value })
        } else if (e.target.id == "input_cur_pass") {
            this.setState({ cur_password: e.target.value })
        } else if (e.target.id == "input_new_pass1") {
            this.setState({ new_password1: e.target.value })
            var status = this.checkPassword(e.target.value);
            if ((!status.len) || (!status.bigIn) || (!status.numIn)) {
                e.target.style.backgroundColor = "#FC8E86";
            } else {
                e.target.style.backgroundColor = "#6CECC7";
            }
            let pass2 = ReactDOM.findDOMNode(document.getElementById("input_new_pass2"));
            if (pass2.value != e.target.value) {
                pass2.style.backgroundColor = "#FC8E86";
            } else {
                pass2.style.backgroundColor = "#FC8E86";
            }
        } else if (e.target.id == "input_new_pass2") {
            this.setState({ new_password2: e.target.value })
            var status = this.checkPassword(this.state.new_password1);
            if (this.state.new_password1 != e.target.value || ((!status.len) || (!status.bigIn) || (!status.numIn))) {
                e.target.style.backgroundColor = "#fc8e86";
            } else {
                e.target.style.backgroundColor = "#6CECC7";
            }
        }
    }

    save = (e) => {
        var formData = new FormData();
        formData.append("avatar", this.state.avatar_file);
        axios.post('http://localhost:3010/api/loadimg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': '123qwe',
                'uid': cookies.get("uid")
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        var data = { uid: cookies.get("uid"), pass: this.state.cur_password };
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe'
            }
        }
        axios.post( "http://localhost:3010/api/check_password", data, config).then(response => {
            if (response.data["status"] == 1) {
                ReactDOM.findDOMNode(document.getElementById("saving_err_msg")).innerHTML = "Неверный пароль";
                ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_opened";
                const timer = setTimeout(() => {
                    ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_closed";
                }, 2000);
                return () => clearTimeout(timer);
            } else {
                if ((this.state.req1 && this.state.req2 && this.state.req3 && this.state.new_password1 == this.state.new_password2) || (this.state.new_password1 == "" && this.state.new_password2 == "")) {
                    data = { uid: cookies.get("uid"), pass: this.state.new_password1, nickname: this.state.nickname, first_name: this.state.first_name, last_name: this.state.last_name };
                    axios.post( "http://localhost:3010/api/update_profile", data, config).then(response => {
                        console.log(response);
                        ReactDOM.findDOMNode(document.getElementById("saving")).className = "saving_opened";
                        const timer = setTimeout(() => {
                            ReactDOM.findDOMNode(document.getElementById("saving")).className = "saving_closed";
                        }, 2000);
                        return () => clearTimeout(timer);
                    }).catch(function (error) {
                        if (error.response) {
                            alert("Ошибка " + String(error.response.status));
                        }
                    });
                } else if (!this.state.req1 || !this.state.req2 || !this.state.req3) {
                    ReactDOM.findDOMNode(document.getElementById("saving_err_msg")).innerHTML = "Новый пароль не соответствует требованиям";
                    ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_opened";
                    const timer = setTimeout(() => {
                        ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_closed";
                    }, 2000);
                    return () => clearTimeout(timer);
                } else if (this.state.new_password1 != this.state.new_password2) {
                    ReactDOM.findDOMNode(document.getElementById("saving_err_msg")).innerHTML = "Пароли не совпадают";
                    ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_opened";
                    const timer = setTimeout(() => {
                        ReactDOM.findDOMNode(document.getElementById("saving_err")).className = "saving_err_closed";
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            }
        }).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        
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

    render() {
        return (
            <div className="change_profile_wrap">
                <Header isMain={false} />
                <ul className="menu">
                        <li className="changing_menu_item">
                            <Link to="/my_profile" style={{height: "40px", width: "200px", display: "flex", alignItems: "center", color: "black"}}>
                                Мой профиль
                            </Link>
                        </li>
                    <li className="changing_menu_item">
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
                <div className="change_profile_main">
                    <div className="change_profile_main_block">
                        <h className="change_profile_label">Никнейм:</h>
                        <input onChange={this.handleInput} id="input_nickname" className="change_profile_input" value={this.state.nickname} />
                        <h className="change_profile_label">Имя:</h>
                        <input onChange={this.handleInput} id="input_first_name" className="change_profile_input" value={this.state.first_name} />
                        <h className="change_profile_label">Фамилия:</h>
                        <input onChange={this.handleInput} id="input_last_name" className="change_profile_input" value={this.state.last_name} />
                    </div>
                    <div className="change_profile_main_block">
                        <h className="change_profile_label">Текущий пароль:</h>
                        <input onChange={this.handleInput} id="input_cur_pass" type="password" className="change_profile_input" value={this.state.cur_password} />
                        <h className="change_profile_label">Новый пароль:</h>
                        <input onChange={this.handleInput} type="password" id="input_new_pass1" className="change_profile_input" value={this.state.new_password1} />
                        <h className="change_profile_label">Повторите новый пароль:</h>
                        <input onChange={this.handleInput} type="password" id="input_new_pass2" className="change_profile_input" value={this.state.new_password2} />
                        <div className="pass_require">
                            <h style={{fontWeight: 700, fontSize: "15px", marginLeft: "8%"}}>Пароль должен:</h>
                            <div>
                                <img src={this.state.req1 ? checkmark : cross} width="25px" id="req_len"/>
                                <h style={{fontSize: "13px", color: "grey"}}>
                                    Состоять из 8+ символов
                                </h>
                            </div>
                            <div>
                                <img src={this.state.req2 ? checkmark : cross} width="25px" id="req_big"/>
                                <h style={{fontSize: "13px", color: "grey"}}>
                                    Содержать хотя бы 1 заглавную букву
                                </h>
                            </div>
                            <div>
                                <img src={this.state.req3 ? checkmark : cross} width="25px" id="req_num"/>
                                <h style={{fontSize: "13px", color: "grey"}}>
                                    Содержать хотя бы 1 цифру
                                </h>
                            </div>
                        </div>
                    </div>
                    <div className="change_profile_main_block" style={{alignItems: "center", marginLeft: "90px", justifyContent: "center"}}>
                        <div style={{width: "220px", height: "250px", display: "block", alignItems: "center"}}>
                            <img src={this.state.avatar_src} style={{display: "block", verticalAlign: "top", maxWidth: "100%", maxHeight: "100%"}} width={this.state.avatar_width > this.state.avatar_height ? "100%" : "auto"} height={this.state.avatar_width <= this.state.avatar_height ? "100%" : "auto"} />
                        </div>
                        <DragNDrop changeAvatarFunc={this.changeAvatar} />
                    </div>
                </div>
                <div className="save_profile_block">
                    <button className="save_profile_btn" onClick={this.save}>Сохранить</button>
                    <div id="saving" className="saving_closed" style={{fontSize: "20px", display: "flex", alignItems: "center", marginLeft: "15px"}}>
                        <img src={checkmark} width="35px" />
                        <h>Сохранено</h>
                    </div>
                    <div id="saving_err" className="saving_err_closed" style={{fontSize: "20px", display: "flex", alignItems: "center", marginLeft: "15px"}}>
                        <img src={cross} width="35px" />
                        <h id="saving_err_msg"></h>
                    </div>
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

import React from "react";
import "./login.css";
import ReactDOM from 'react-dom';
import login_block_img from "../../static/login_block_img.png";
import logo_vk from "../../static/logo_vk.svg";
import logo_gosuslugi from "../../static/logo_gosuslugi.png";
import logo_mailru from "../../static/logo_mail_ru.svg";
import logo_yandex from "../../static/logo_yandex.png";
import checkmark from "../../static/checkmark.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import './pretty-checkbox.min.css';

const cookies = new Cookies();


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.navigate = this.props.navigate;
        this.state = {
            login: "",
            password: ""
        }
    }

    handleClick = event => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe'
            }
        }
        var nav = this.props.navigate;
        const data = {public_key: this.state.login, private_key: this.state.password};
        axios.post( "http://localhost:3010/api/login", data, config).then(function(response) {
            if (Object.keys(response).length != 0 && Object.keys(response.data).length != 0 && response.data["status"] == 1) {
                alert("Неверный логин или адрес почты")
            } else if ((Object.keys(response).length != 0 && Object.keys(response.data).length != 0 && response.data["status"] == 2)) {
                alert("Неверный пароль")
            } else if (Object.keys(response).length != 0 && Object.keys(response.data).length != 0 && Object.keys(response.data).includes("token")) {
                // console.log(nav);
                cookies.set("jwt", response.data["token"], { path: "/", sameSite: "strict" });
                cookies.set("uid", response.data["uid"], { path: "/", sameSite: "strict" });
                nav("/my_profile", { replace: true });
            } else {
                alert("Ошибка сервера");
            }
        }).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });
        
    }

    onTextChange = event => {
        switch (event.target.className ){
            case "log_login_input": 
                this.setState({login: event.target.value});
                break;
            case "log_password_input": 
                this.setState({password: event.target.value});
                break;
        }
    }

    render() {
        return (
            <div className="log_block" style={this.props.style}>
                <div className="log_title">
                    <h style={{marginTop: "40px"}}>Авторизация</h>
                    <img src={login_block_img} width="400px" style={{marginTop: "20px"}}></img>
                </div>
                <div className="log_main">
                    <div className="log_inputs">
                        <input type="text" placeholder="Логин / почта" className="log_login_input" onChange={this.onTextChange}></input>
                        <input type="password" placeholder="Пароль" className="log_password_input" onChange={this.onTextChange}></input>
                    </div>
                    <div className="log_proceed">
                        <div style={{display: "block", marginLeft: "21px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <input type="checkbox" className="login_checkbox"></input>
                                <label style={{marginLeft: "5px", fontSize: "15px", color: "white"}}>Запомнить пароль</label>
                            </div>
                            <button className="login_btn" onClick={this.handleClick}>
                                Войти
                            </button>
                        </div>
                        <hr style={{direction: "vertical", border: " 1px solid black", marginTop: "0px"}}/>
                        <div style={{display: "block", marginLeft: "3px", width: "50%"}}>
                                {/* <div style={{userSelect: "none"}}>
                                    <h style={{color: "white", fontSize: "15px"}}>
                                        Войти с помощью
                                    </h>
                                </div>
                            <div style={{display: "flex", marginTop: "5px"}} className="ext_auth">
                                <img style={{userSelect: "none", filter: "invert(100%)"}} src={logo_vk} width="30px" height="30px"></img>
                                <img style={{marginLeft: "10px", userSelect: "none"}} src={logo_gosuslugi} height="30px"></img>
                                <img style={{marginLeft: "10px", userSelect: "none", filter: "invert(100%)"}} src={logo_mailru} height="30px"></img>
                                <img style={{marginLeft: "10px", userSelect: "none"}} src={logo_yandex} height="30px"></img>
                            </div> */}
                            <Link to="/registration">
                                <div style={{marginTop: "5px", cursor: "pointer", userSelect: "none"}}>
                                    <h className="noacc">
                                        Еще не зарегистрированы?
                                    </h>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LoginClass extends React.Component {
    constructor() {
        super();
        this.data1 = React.createRef();
        this.data2 = React.createRef();
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            name: "",
            last_name: "",
            login: "",
            nickname: "",
            email: "",
            phone: "",
            password: "",
            reg_display: "block",
            conf_display: "none",
            conf_answer: ""
        }
    }

    onInputChange(e) {
        this.setState({
            name: e.name,
            last_name: e.last_name,
            login: e.login,
            nickname: e.nickname,
            email: e.email,
            password: e.password1,
            phone: e.phone
        });

    }

    render() {
        return (
            <div className="log_wrap">
                <LoginForm changeFunc={this.onInputChange} navigate={this.props.navigate} style={{display: this.state.reg_display}}/>
            </div>
        )
    }
}

export default function Login() {
    let navigate = useNavigate();
    return <LoginClass navigate={navigate} />
}

import React from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import "./Registration.css";
import ReactDOM from 'react-dom';
import cross from "../../static/cross.png";
import checkmark from "../../static/checkmark.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onBoxChange = this.onBoxChange.bind(this);
        this.state = {
            name: "",
            last_name: "",
            login: "",
            nickname: "",
            email: "",
            phone: "",
            password1: "",
            password2: "",
            req1: false,
            req2: false,
            req3: false,
            reg_status: 0,
            box: false,
        }
    }

    handleClick(e) {
        if (e.target.id == "reg_btn") {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }
            var resp;
            const data = {email: this.props.u_email, login: this.props.u_login};
            axios.post( "http://localhost:3010/api/check_existance", data, config).then(response => resp = response).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
              });

            if (this.state.email != "" && this.state.login != "" && this.state.req1 && this.state.req2 && this.state.req3 && this.state.password1 == this.state.password2 && this.state.box) {
                this.state.reg_status = 1;
                this.props.confFunc({"name": this.state.name, "last_name": this.state.last_name, "login": this.state.login, "nickname": this.state.nickname, "email": this.state.email, "phone": this.state.phone, "password": this.state.password1})
            } else if (this.state.email == "" || this.state.login == "" || this.state.password1 == "" || this.state.password2 == ""){
                alert("Вы заполнили не все обязательные поля");
            } else if (!this.state.req1 || !this.state.req2 || !this.state.req3) {
                alert("Пароль не соответствует требованиям");
            } else if (this.state.password1 != this.state.password2) {
                alert("Пароли не совпадают");
            } else if (!this.state.box) {
                alert("Вы не согласились с правилами");
            }

            if (resp && resp.data["status"] == 1) {
                alert("Пользователь с такой почтой уже есть")
            }
            if (resp && resp.data["status"] == 2) {
                alert("Пользователь с таким логином уже есть")
            }
        }
    }

    onBoxChange(e) {
        if (e.target.checked) {
            this.setState({box: true});
        } else {
            this.setState({box: false});
        }
    }

    checkPassword(pass) {
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

    onTextChange = event => {
        let tmp
        switch (event.target.id ){
            case "input_name": 
                this.setState({name: event.target.value});
                tmp = this.state;
                tmp.name = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_last_name": 
                this.setState({last_name: event.target.value});
                tmp = this.state;
                tmp.last_name = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_login": 
                this.setState({login: event.target.value});
                tmp = this.state;
                tmp.login = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_nickname": 
                this.setState({nickname: event.target.value});
                tmp = this.state;
                tmp.nickname = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_mail": 
                this.setState({email: event.target.value});
                tmp = this.state;
                tmp.email = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_phone": 
                this.setState({phone: event.target.value});
                tmp = this.state;
                tmp.phone = event.target.value;
                this.props.changeFunc(tmp);
                break;
            case "input_pass1": 
                this.setState({password1: event.target.value});
                tmp = this.state;
                tmp.password1 = event.target.value;
                this.props.changeFunc(tmp);
                var status = this.checkPassword(event.target.value);
                if ((!status.len) || (!status.bigIn) || (!status.numIn)) {
                    event.target.style.backgroundColor = "#fc8e86";
                } else {
                    event.target.style.backgroundColor = "#6CECC7";
                }
                let pass2 = ReactDOM.findDOMNode(document.getElementById("input_pass2"));
                if (pass2.value != event.target.value) {
                    pass2.style.backgroundColor = "#fc8e86";
                } else {
                    pass2.style.backgroundColor = "#6CECC7";
                }
                break;
            case "input_pass2":
                this.setState({password2: event.target.value});
                var status = this.checkPassword(event.target.value);
                if (this.state.password1 != event.target.value || ((!status.len) || (!status.bigIn) || (!status.numIn))) {
                    event.target.style.backgroundColor = "#fc8e86";
                } else {
                    event.target.style.backgroundColor = "#6CECC7";
                }
                break;
        }
    }

    render() {
        return (
            <div className="reg_block" style={this.props.style}>
                <div className="reg_title">
                    <h style={{marginBottom: "10px"}}>Форма регистрации</h>
                </div>
                <table className="inputs">
                    <tr className="inputs_row">
                        <td className="inputs_col">
                            <input onChange={this.onTextChange} maxLength="30" id="input_name" type="text" placeholder="Имя"></input>
                        </td>
                        <td className="inputs_col">
                            <input onChange={this.onTextChange} maxLength="40" id="input_last_name" type="text" placeholder="Фамилия"></input>
                        </td>
                    </tr>
                    <tr className="inputs_row">
                        <td className="inputs_col">
                            <h style={{marginBottom: "10px", marginRight: "5px"}}>*</h>
                            <input style={{marginRight: "10px"}} onChange={this.onTextChange} maxLength="30" id="input_login" required type="text" placeholder="Логин"></input>
                        </td>
                        <td className="inputs_col">
                            <input onChange={this.onTextChange} maxLength="20" id="input_nickname" type="text" placeholder="Никнейм"></input>
                        </td>
                    </tr>
                    <tr className="inputs_row">
                        <td className="inputs_col">
                            <h style={{marginBottom: "10px", marginRight: "5px"}}>*</h>
                            <input style={{marginRight: "10px"}} onChange={this.onTextChange} required maxLength="50" id="input_mail" type="text" placeholder="Почта"></input>
                        </td>
                        <td className="inputs_col">
                            <input onChange={this.onTextChange} type="text" id="input_phone" placeholder="Телефон"></input>
                        </td>
                    </tr>
                    <tr className="inputs_row">
                        <td className="inputs_col">
                            <h style={{marginBottom: "10px", marginRight: "5px"}}>*</h>
                            <input style={{marginRight: "10px"}} onChange={this.onTextChange} required minLength="8" id="input_pass1" maxLength="70" type="password" placeholder="Пароль"></input>
                        </td>
                        <td className="inputs_col">
                            <h style={{marginBottom: "10px", marginRight: "5px"}}>*</h>
                            <input style={{marginRight: "10px"}} onChange={this.onTextChange} required minLength="8" id="input_pass2" maxLength="70" type="password" placeholder="Подтверждение пароля"></input>
                        </td>
                    </tr>
                    <tr className="inputs_row">
                        <td className="pass_require">
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
                        </td>
                        <td className="inputs_col">
                            <input onChange={this.onBoxChange} type="checkbox" id="agreed" style={{width: "auto", border: 0}}/>
                            <h style={{width: "70%", fontSize: "13px", fontWeight: 400, color: "#000000B2", marginLeft: "5%"}}>С правилами пользования сервисом согласен</h>
                        </td>
                    </tr>
                </table>
                <div style={{display: "inline-flex", marginTop: "10px", alignItems: "center"}}>
                    <button onClick={this.handleClick} id="reg_btn">Зарегистрироваться</button>
                    <Link to="/login" className="have_acc">Есть аккаунт?</Link>
                </div>
            </div>
        )
    }
}

class MailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);
        this.onNumInput = this.onNumInput.bind(this);
        this.state = {
            name: props.u_name,
            last_name: props.u_last_name,
            login: props.u_login,
            nickname: props.u_nickname,
            email: props.u_email,
            phone: props.u_phone,
            password: props.u_password,
            conf_answer: props.u_conf_answer,
            user_answer: ["", "", "", "", "", ""]
        }
    }

    onBtnClick() {
        if (this.state.user_answer.join("") == this.props.u_conf_answer) {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': '123qwe'
                }
            }
            var data = {first_name: this.props.u_first_name, last_name: this.props.u_last_name, email: this.props.u_email, nickname: this.props.u_nickname, login: this.props.u_login, password: this.props.u_password};
            axios.post( "http://localhost:3010/api/registration", data, config).then(response => console.log(response)).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
            });

            var resp;
            data = {public_key: this.props.u_email, private_key: this.props.u_password};
            axios.post( "http://localhost:3010/api/login", data, config).then(response => resp = response).catch(function (error) {
                    if (error.response) {
                        alert("Ошибка " + String(error.response.status));
                    }
                });
            if (resp && resp.data["status"] == 1) {
                alert("Неверный логин или адрес почты")
            } else if (resp && resp.data["token"]) {
                cookies.set("jwt", resp.data["token"], { path: "/" })
            }
        }
    }

    onNumInput(e) {
        let id = parseInt(e.target.id.split("_")[1]);
        if (e.target.value.length > 0) {
            let new_user_answer = this.state.user_answer;
            new_user_answer[id - 1] = e.target.value;
            this.setState({user_answer: new_user_answer});
            if (id != 6) {
                ReactDOM.findDOMNode(document.getElementById(`inp_${id + 1}`)).focus();
            } else {
                ReactDOM.findDOMNode(document.getElementById(`inp_6`)).blur();
            }
        } else {
            if (id != 1) {
                ReactDOM.findDOMNode(document.getElementById(`inp_${id - 1}`)).focus();
            }
        }
    }

    render() {
        return (
            <div className="reg_block" style={this.props.style}>
                <div className="reg_title">
                    <h style={{marginBottom: "10px", fontFamily: "Roboto", color: "#000000B2"}}>Подтверждение почты</h>
                </div>
                <div className="conf_main">
                    <h>Письмо улетело, а ты еще нет!</h>
                    <h>Скорее подтверждай почту и присоединяйся к сообществу </h>
                    <h>Vmeste</h>
                    <div className="conf_inputs">
                        <input id="inp_1" onChange={this.onNumInput} maxLength="1" className="conf_input"/>
                        <input id="inp_2" onChange={this.onNumInput} maxLength="1" className="conf_input" style={{marginLeft: "20px"}}/>
                        <input id="inp_3" onChange={this.onNumInput} maxLength="1" className="conf_input" style={{marginLeft: "20px"}}/>
                        <input id="inp_4" onChange={this.onNumInput} maxLength="1" className="conf_input" style={{marginLeft: "20px"}}/>
                        <input id="inp_5" onChange={this.onNumInput} maxLength="1" className="conf_input" style={{marginLeft: "20px"}}/>
                        <input id="inp_6" onChange={this.onNumInput} maxLength="1" className="conf_input" style={{marginLeft: "20px"}}/> 
                    </div>
                    <div style={{marginTop: "30px"}}>
                        <button id="conf_btn" onClick={this.onBtnClick}>Подтвердить почту</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Registration extends React.Component {
    constructor() {
        super();
        this.data1 = React.createRef();
        this.data2 = React.createRef();
        this.confirmation = this.confirmation.bind(this);
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

    confirmation(e) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe'
            }
        }
        const data = {email: e.email};
        axios.post( "http://localhost:3010/api/confirm_email", data, config)
             .then(response => this.setState({conf_answer: String(Math.floor(response.data.ans / (2 ** response.data.key)))})).catch(function (error) {
                if (error.response) {
                    alert("Ошибка " + String(error.response.status));
                }
              });;
        this.setState({
            reg_display: "none",
            conf_display: "block"
        })
    }

    render() {
        return (
            <div>
                <Header isMain={false} />
                <div className="reg_wrap">
                    <RegForm changeFunc={this.onInputChange} confFunc={this.confirmation} style={{display: this.state.reg_display}}/>
                    <MailConfirmation id="mailconf" style={{height: "400px", display: this.state.conf_display}} u_name={this.state.name} u_last_name={this.state.last_name} u_login={this.state.login} u_nickname={this.state.nickname} u_email={this.state.email} u_phone={this.state.phone} u_password={this.state.password} u_conf_answer={this.state.conf_answer} />
                </div>
                <Footer style={{background: "#FFFDC7", height: "380px"}}/>
            </div>
        )
    }
}
export default Registration;

import "./Footer.css";
import TextInput from "../common/TextInput/TextInput.js"
import React from "react";
import mail_sent from "../../static/mail_sent.png"
import footer_apple from "../../static/footer_apple.png"
import footer_googleplay from "../../static/footer_googleplay.png"
import ReactDOM from 'react-dom';
import axios from 'axios';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        const current_email = this.email.current;
        axios.get( "http://localhost:3010/api/add_email", {
            headers: {
                'Content-Type': 'application/json',
                'authorization': '123qwe',
                'email': current_email.state.text
            }}).catch(function (error) {
            if (error.response) {
                alert("Ошибка " + String(error.response.status));
            }
        });
        this.email.current.setState({text: ""})
        ReactDOM.findDOMNode(document.getElementById("subscribed_email")).removeAttribute("hidden")
    }
    render() {
        return (
            <footer style={this.props.style}>
                <div className="upper">
                    <div className="div_news">
                        <u>
                            Подпишись на новости:
                        </u>
                        <TextInput ref={this.email} id="footer_news_email" ph="e-mail" top="10px" w="250px" color="#000000"></TextInput>
                        <div style={{display: "inline-flex", width: "320px"}}>
                            <button className="footer_news_btn" onClick={this.handleClick}>
                                Подписаться
                            </button>
                            <div display="inline-flex" hidden id="subscribed_email" style={{marginLeft: "20px"}}>
                                <img src={mail_sent} width="20px" style={{marginTop: "27px"}}></img>
                                <h style={{marginLeft: "8px"}}>
                                    Вы подписаны
                                </h>
                            </div>
                        </div>
                    </div>
                    <div className="download">
                        <u>
                            Скачать приложение:
                        </u>
                        <img onClick={() => {window.location.replace("https://yandex.ru")}} src={footer_apple} width="250px" style={{marginTop: "30px", border: "2px solid white", borderRadius: "13px"}}></img>
                        <img onClick={() => {window.location.replace("https://yandex.ru")}} src={footer_googleplay} width="250px" style={{marginTop: "10px", border: "2px solid white", borderRadius: "13px"}}></img>
                    </div>
                </div>
                <div className="bottom">
                    <hr width="85%" style={{borderTop: "1px #9D9B9B", borderWidth: "3px"}}></hr>
                    <div>
                        <h>
                            VMESTE ©copyright 2023
                        </h>
                    </div>
                </div>
            </footer>
    )
    }
}

export default Footer;

import React from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import "./error404.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Error404Class extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.props.navigate("/my_profile", { replace: true });
    }
    render() {
        return (
            <div className="error404_wrap">
                <h className="h1">ERROR 404</h>
                <h className="h2">ERROR 404</h>
                <button onClick={this.onClickHandler}>На главную</button>
            </div>
        )
    }
}
function Error404() {
    let navigate = useNavigate();
    return <Error404Class navigate={navigate} />
}

export default Error404;

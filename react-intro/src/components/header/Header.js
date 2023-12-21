// import React from "./react";
import Logo from '../common/Logo/Logo';
import "./Header.css";
import ScrollToButton from "../common/ScrollToButton.js";
import { Link } from "react-router-dom";
import back from "../../static/header_back.png";

function NavBar() {
    return (
        <div class="nav-block">
            <ScrollToButton toId="tab-1">Особенности</ScrollToButton>
            <ScrollToButton toId="tab-2">Популярные пользователи</ScrollToButton>
            <ScrollToButton toId="tab-3">Про нас</ScrollToButton>
        </div>
    )
}

function RegSigninBtn() {
    return (
        <div class="reg-signin-block">
            <Link className='rsbtn' to="/login" style={{color: "#000"}}>Login</Link>
            <h>/</h>
            <Link className='rsbtn' to="/registration" style={{color: "#000"}}>Sign up</Link>
        </div>
    )
}

function Header(props) {
    return (
        <header>
            <div id="header-div">
                <Logo width="110"/>
                {props.isMain && <NavBar />}
                {props.isMain && <RegSigninBtn />}
            </div>
        </header>
    )
}

export default Header;

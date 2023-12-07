// import React from "./react"
import "./Logo.css";
import logo from "../../../static/logo.png";
import { Link } from "react-router-dom";

function Logo(props) {
    return (
        <Link to="/">
            <img id="logo_img" src={logo} alt="logo" width={props.width + "px"} height={props.width + "px"}/>
        </Link>
    )
}

export default Logo;

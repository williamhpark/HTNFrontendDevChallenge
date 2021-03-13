import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/images/htn_icon.png";

const Header = () => {
  return (
    <div>
      <Link className="logo" to="/">
        <img src={logo} alt="Hack the North logo" />
      </Link>
      <div className="header-right">
        <Link className="login-btn link" to="/login">
          Login
        </Link>
        <Link className="register-btn link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;

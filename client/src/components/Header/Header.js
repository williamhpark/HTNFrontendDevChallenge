import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/images/htn_icon.png";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="Hack the North logo" />
      </Link>
      {userData.user ? (
        <div className="header-right">
          <p
            className="link"
            onClick={() => setUserData({ token: undefined, user: undefined })}
          >
            Logout
          </p>
        </div>
      ) : (
        <div className="header-right">
          <Link className="login-btn link" to="/login">
            Login
          </Link>
          <Link className="register-btn link" to="/register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

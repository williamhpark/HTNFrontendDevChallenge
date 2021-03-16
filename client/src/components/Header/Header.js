import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/images/htn_icon.png";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    // Clear the user data in context
    setUserData({ token: undefined, user: undefined });
    // Clear the auth-token in local storage
    localStorage.setItem("auth-token", "");
  };

  return (
    <div className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="Hack the North logo" />
      </Link>
      {userData.user ? (
        // The Logout button is shown if a user is logged in.
        <div className="header-right">
          <p className="link" onClick={logout}>
            Logout
          </p>
        </div>
      ) : (
        // The Login/Register buttons are shown if no user is logged in.
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

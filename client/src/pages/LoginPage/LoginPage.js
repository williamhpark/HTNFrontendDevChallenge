import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./LoginPage.css";
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const { setUserData } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await axios.post("/api/users/login", loginUser);
      // Update the UserContext state
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });

      // Set the auth-token in the browser
      localStorage.setItem("auth-token", loginRes.data.token);

      // Redirect user to the Event List Page
      history.push("/");
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    // Clear the user data
    setUserData({ token: undefined, user: undefined });
  }, []);

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="btn btn-primary btn-block"
          type="submit"
          value="Login"
        />
      </form>
      {/* Display the error message if one is returned from the internal API. */}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default LoginPage;

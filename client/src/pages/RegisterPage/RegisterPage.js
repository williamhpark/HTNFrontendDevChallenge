import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./RegisterPage.css";
import { UserContext } from "../../context/UserContext";

const RegisterPage = () => {
  const { setUserData } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password, passwordCheck };
      // Send the new user data to the /register API endpoint
      await axios.post("/api/users/register", newUser);
      const loginRes = await axios.post("/api/users/login", {
        email,
        password,
      });
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
    <div className="register-page">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Verify password"
            className="form-control"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <input
          className="btn btn-primary btn-block"
          type="submit"
          value="Register"
        />
      </form>
      {/* Display the error message if one is returned from the internal API. */}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default RegisterPage;

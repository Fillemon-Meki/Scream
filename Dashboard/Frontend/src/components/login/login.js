import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post("http://localhost:9002/login", user) // Replace with the correct URL of your backend
      .then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        if (res.data.user) {
          navigate("/homepage");
        }
      });
  };
  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      {console.log("User", user)}
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Enter your E-mail"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter your Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={handleClick}>
        Register
      </div>
    </div>
  );
};

export default Login;

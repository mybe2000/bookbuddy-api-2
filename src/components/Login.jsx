import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken, token }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password && userData.email) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, userData)
        .then((data) => {
          console.log(data);
          setToken(data.data.token);
          localStorage.setItem("token", data.data.token);
        })
        .catch((err) => console.log(err));
    }
  };

  if (token) navigate("/account");
  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={handleInput} />
        </label>
        <button>Login</button>

        <div className="signUpNow">
          <p>
            Don't have an account?
            <Link to="/register">Sign up now!</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

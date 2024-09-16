import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setToken, token }) {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.email) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, formData)
        .then((result) => {
          console.log(result);
          setToken(result.data.token);
        })
        .catch((err) => console.log(err));
    }
  };

  if (token) navigate("/account");

  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" onChange={handleInput} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" onChange={handleInput} />
        </label>
        <label>
          Email:
          <input type="text" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={handleInput} />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import './Register.css';
import {Link} from "react-router-dom"
import axios from 'axios';
import api from '../../utils/axiosConfig';
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      email,
      role: ['user']
    };

    api.post('/api/auth/signup' , userData).then(
      (res)=>{
        console.log(res.data);
        alert(res.data.message);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    )

    console.log(userData);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
          <br/>
          <span>
             <Link style={{margin:"5px" , color:"#0074d9"}} to="/login">Already have an Account! Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;

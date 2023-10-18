import React, { useState } from 'react';
import api from '../../utils/axiosConfig';
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    let user = {
      username: username,
      password: password
    }

    api.post('/api/auth/signin', user).then(
      (res) => {
        console.log(JSON.stringify(res.data));
        localStorage.setItem('user' , JSON.stringify(res.data))
        if(localStorage.getItem('user') !== null){
            navigate('/');
        }
      }
    ).catch((error) => {
      alert('password or username error');
      console.log(error);
    })
  };

  return (
    <div className='container'>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className='input'
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className='input'
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='button' type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import './Login.css'
import googleIcon from './google.svg'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  

  const loginCredentials = { username, password };
  const baseURL = 'http://127.0.0.1:8000/';

  const handleLogin = () => {
    if (!username || !password){
      setError('Please fill in both fields.')
      return;
    }
    axios.post(baseURL + 'api/token/', loginCredentials)
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        console.error(err.message);
        setError('Invalid credentials.'); 
      });
  }

  return (
    <div className='sign-up-body'>
      <div className="sign-up-container">
        <div className="header">
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Log in to Notely</h1>

          <div className="action-buttons">
            <button className="primary-button sign-in-button">
              <img src={googleIcon} alt="Google Sign In" height={24} width={24} />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="divider">
            <p>or</p>
          </div>


          <div className="email-log-in mb-3">
            <input
              type="text"
              id="log-in"
              placeholder="Email or username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="log-in">Email or username</label>
          </div>

          <div className="email-log-in">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="action-buttons">
            <button className="primary-button custom-button" onClick={handleLogin}>Log in</button>
            <button className="secondary-button custom-button">Forgot Password?</button>
              {error && <p className="m-0 text-danger">{error}</p>}
          </div>
        </div>

        <div className="sign-up">
          <p>Don't have an account? <Link to={'/signup'} className='custom-link'>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

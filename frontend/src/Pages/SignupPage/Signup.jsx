import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(''); 

  const signUpCredentials = {
    username,
    email,
    password: password1, 
  };

  const baseURL = 'http://127.0.0.1:8000/';

  const handleSignUp = () => {
    if (!username || !email || !password1 || !password2) {
      setError('Please fill in all fields.');
      return;
    }

    if (password1 !== password2) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    axios.post(baseURL + 'api/register/', signUpCredentials)
      .then(res => {
        console.log(res.data);
        navigate('/login'); 
      })
      .catch(err => {
        console.error(err.message);
        setError('Signup failed. Please try again.'); 
      });
  };

  return (
    <div className='sign-up-body'>
      <div className="sign-up-container">
        <div className="header">
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Sign up for Notely</h1>

          <div className="divider">
            <p className='text-dark'>-</p>
          </div>


          <div className="email-log-in mb-3">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              />
            <label htmlFor="email">Email</label>
          </div>
          <div className="email-log-in mb-3">
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              />
            <label htmlFor="username">Username</label>
          </div>
          <div className="email-log-in mb-3">
            <input
              type="password"
              id="password1"
              placeholder="Password"
              onChange={(e) => setPassword1(e.target.value)}
              />
            <label htmlFor="password1">Password</label>
          </div>
          <div className="email-log-in">
            <input
              type="password"
              id="password2"
              placeholder="Confirm Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label htmlFor="password2">Confirm Password</label>
          </div>

          <div className="action-buttons">
            <button className="primary-button custom-button" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>

        <div className="sign-up">
          <p>Already have an account? <Link to={'/login'} className='custom-link'>Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

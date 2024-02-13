import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://3.17.58.73:80/api/token/', {
        username,
        password
      }, { withCredentials: true }); // Only if you use HTTP-only cookies
      // Assuming your backend responds with a token and you're not using HTTP-only cookies
      const token = response.data.access; // Or `response.data.token` depending on your backend
      console.log('Token:', token); // Log the token
      if (token) {
        localStorage.setItem('authToken', token); // You may choose to handle storage in App.js
        onLoginSuccess(token); // Update the global state
        navigate('/dashboard');
      } else {
        console.error('Token not found in response');
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err.response || err); // Log the full error
      setError(err.response?.data?.detail || 'An error occurred.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', textAlign: 'center' }}>
        {/* <img src="/path-to-your-logo.png" alt="Kaizntree" style={{ marginBottom: '20px' }} /> */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px' }}
              placeholder="Username"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px' }}
              placeholder="Password"
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>
            LOG IN
          </button>
          <div style={{ marginTop: '20px' }}>
            <a href="/create-account" style={{ marginRight: '10px' }}>CREATE ACCOUNT</a>
            <a href="/forgot-password">FORGOT PASSWORD</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
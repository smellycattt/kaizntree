import './App.css';
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (token) => {
    // Save the token in local storage or context
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };
  // Define a wrapper component
  function LoginWrapper({ onLoginSuccess }) {
    return <Login onLoginSuccess={onLoginSuccess} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginWrapper onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { setAuthToken } from './authManager';
import './auth.scss';
import LogoPL from '../../assets/images/PL.webp';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      
      if (setAuthToken(response.data.token, response.data.username)) {
        // Success - redirect to home page
        window.location.href = '/';
      } else {
        setError('Failed to store authentication data');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="welcome-container">
        <div className="logo-container">
          <img src={LogoPL} alt="Premier Zone Logo" />
        </div>
        <h1 className="welcome-text">Welcome to Premier Zone</h1>
      </div>
      
      <Card className="auth-card">
        <CardHeader className="auth-header">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="auth-content">
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message text-red-600 mb-4">
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">Login</button>
          </form>
          <div className="auth-footer">
            Don't have an account? <a href="/register">Register here</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
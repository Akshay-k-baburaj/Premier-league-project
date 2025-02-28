import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import './auth.scss';
import LogoPL from '../../assets/images/PL.webp';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent className="auth-content">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
              />
            </div>
            <button type="submit" className="auth-button">Register</button>
          </form>
          <div className="auth-footer">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
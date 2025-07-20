// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', form);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          className="register-input"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import './LogInPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      const payload = new FormData();

      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      const submitResponse = await axios.post(`${backendUrl}/token`, payload);
      localStorage.setItem("access_token", submitResponse?.data.access_token);
      setSuccess(true);
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.detail || 'An error occurred while logging in.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          required
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />

        <button className="login-form-button" type="submit" disabled={isLoading}>
          Log In
        </button>
        {error &&
            <div className="error-message">{error}</div>
        }
        {success &&
            <div className="success-message">Logged in successfully!</div>
        }
      </form>
    </div>
  );
};

export default LogInPage;

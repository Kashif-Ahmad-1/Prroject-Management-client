import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Using useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Get the user role from the response
      const user = response.data.user;
      const token = response.data.token;

      // Store the JWT token in localStorage or cookies
      localStorage.setItem('authToken', token);

      // Redirect to the appropriate dashboard based on the role using navigate()
      if (user.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else if (user.role === 'developer') {
        navigate('/developer-dashboard'); // Redirect to developer dashboard
      } else if (user.role === 'supervisor') {
        navigate('/supervisor-dashboard'); // Redirect to supervisor dashboard
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

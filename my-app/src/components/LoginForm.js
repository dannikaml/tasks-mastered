// LoginForm.js
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login form submission
    // Example: Send API request to authenticate user
    // You can handle form validation, error handling, and authentication logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { gql, useMutation, ApolloClient, InMemoryCache } from '@apollo/client';

const LOGIN_USER = gql`
  mutation loginUser($input: UserInput!) {
    loginUser(input: $input) {
      id
      email
      username
      token
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = { email, password, username };
      const { data } = await loginUser({ variables: { input } });

      // User logged in successfully
      console.log('User logged in successfully:', data.loginUser);

      // Store the token in local storage or cookies
      const token = data.loginUser.token;
      localStorage.setItem('token', token); // Store in local storage
      
      console.log('new client created');


    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={username} onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

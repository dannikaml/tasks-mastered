import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_USER = gql`
  mutation loginUser($input: UserInput!) {
    loginUser(input: $input) {
      id
      email
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = { email, password };
      const { data } = await loginUser({ variables: { input } });

      // User logged in successfully
      console.log('User logged in successfully:', data.loginUser);
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

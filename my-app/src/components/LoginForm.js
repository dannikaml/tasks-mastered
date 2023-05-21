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

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = { email, password };
      const { data } = await loginUser({ variables: { input } });

      // User logged in successfully
      console.log('User logged in successfully:', data.loginUser);

      // Store the token in local storage or cookies
      const token = data.loginUser.token;
      localStorage.setItem('token', token); // Store in local storage

      // Create a new Apollo client instance with the token set in the request headers
      const client = new ApolloClient({
        uri: 'http://localhost:3001/graphql',
        cache: new InMemoryCache(),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Use the client for subsequent API calls
      const { data: apiData } = await client.query({
        query: gql`
          query {
              users {
                id
                username
                email
              }
          }
        `,
      });

      console.log('API response:', apiData);

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

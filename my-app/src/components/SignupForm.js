import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = { email, password, username };
      const { data } = await signupUser({ variables: { input } });

      // User created successfully
      console.log('User created successfully:', data.createUser);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p><label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></p>
      <p><label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></p>
      <p><label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /></p>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;


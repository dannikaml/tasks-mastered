// SignupForm.js
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send mutation request to create a new user
      const { data } = await createUser({ variables: { email, password } });

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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;

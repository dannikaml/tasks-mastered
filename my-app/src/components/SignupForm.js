// SignupForm.js
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send mutation request to create a new user
      const { data } = await signupUser({ variables: { email, password } });

      // User created successfully
      console.log('User created successfully:', data.signupUser);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;

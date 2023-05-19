const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    signupUser(email: String!, password: String!): User! # Add this line
    deleteUser(id: ID!): DeleteUserResponse!
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;

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
    deleteUser(id: ID!): DeleteUserResponse!
    loginUser(input: UserInput!): AuthUserResponse!
    createPaymentIntent(amount: Float!): PaymentIntentResponse!
    donate(amount: Float!): String! 
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String!
  }

  type AuthUserResponse {
    id: ID!
    email: String!
    username: String!
    token: String!
  }

  type PaymentIntentResponse {
    clientSecret: String!
  }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    taskInput: String!
    completed: Boolean!
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    userSignedIn: Boolean!
    tasks: [Task]!
  }

  input TaskInput {
    taskInput: String!
    completed: Boolean
  }

  input ProjectInput {
    title: String!
    description: String!
    userSignedIn: Boolean
    tasks: [TaskInput]
  }

  type Query {
    projects: [Project]!
    project(id: ID!): Project
  }

  type Mutation {
    createProject(input: ProjectInput!): Project!
    updateProject(id: ID!, input: ProjectInput!): Project!
    deleteProject(id: ID!): DeleteProjectResponse!
  }

  type DeleteProjectResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;

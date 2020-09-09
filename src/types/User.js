const { gql } = require("apollo-server");

module.exports = gql`
  type user {
    id: ID!
    nom: String!
    postNom: String!
    sex: String!
    password: String!
    numero: String!
    email: String!
    prenon: String!
  }

  input CreateUserInput {
    nom: String!
    postNom: String!
    sex: String!
    password: String!
    numero: String!
    email: String!
    prenon: String!
  }

  input UpdateUserInput {
    nom: String!
    postNom: String!
    sex: String!
    password: String!
    numero: String!
    email: String!
    prenon: String!
  }

  input DeleteUserInput {
    id: ID!
  }

  type DeletePayload {
    id: ID!
  }

  type Query {
    users: [user]
  }

  type Mutation {
    createUser(input: CreateUserInput!): user!
    updateUser(id: ID!, input: UpdateUserInput!): user!
    deleteUser(id: ID!): DeletePayload!
  }
`;

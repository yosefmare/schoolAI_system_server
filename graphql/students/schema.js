import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    lesson: String!
  }

  type Query {
    students(lesson: String!): [Student!]!
  }
`;

export default typeDefs;

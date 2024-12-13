import { ApolloServer } from "apollo-server-express";
import typeDefs from "../graphql/schemas/students/schema.js";
import resolvers from "../graphql/schemas/students/resolvers/resolvers.js";


const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer(app) {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}

export default startApolloServer
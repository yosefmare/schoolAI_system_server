import { ApolloServer } from "apollo-server-express";
import typeDefs from "../graphql/students/schema.js";
import resolvers from "../graphql/students/resolvers.js";


const apolloServer = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer(app) {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}

export default startApolloServer
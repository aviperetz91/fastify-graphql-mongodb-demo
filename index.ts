import 'graphql-import-node';
import fastify from 'fastify';
import mercurius from 'mercurius';
import connectDB from './configuration/database';
// @ts-ignore
import userSchema from './graphql/schemas/user.schema.graphql';
import { userResolvers } from './graphql/resolvers/user.resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const user = makeExecutableSchema({
  typeDefs: userSchema,
  resolvers: userResolvers,
});

async function main() {
  await connectDB();

  const server = fastify({ logger: true });

  server.get('/', (req, reply) => {
    reply.send({ test: true });
  });

  server.register(mercurius, {
    path: '/graphql',
    schema: user,
    graphiql: true,
  });

  try {
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();

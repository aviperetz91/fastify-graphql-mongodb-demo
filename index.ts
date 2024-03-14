import 'graphql-import-node';
import fastify from 'fastify';
import mercurius from 'mercurius';
import connectDB from './configuration/database';

// @ts-ignore
import userSchema from './graphql/schemas/user.schema.graphql';
import postSchema from './graphql/schemas/post.schema.graphql';

import userResolvers from './graphql/resolvers/user.resolvers';
import postResolvers from './graphql/resolvers/post.resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const mergedSchema = makeExecutableSchema({
  typeDefs: [userSchema, postSchema],
  resolvers: [userResolvers, postResolvers],
});

async function main() {
  await connectDB();

  const server = fastify({ logger: true });

  server.get('/', (req, reply) => {
    reply.send({ test: true });
  });

  server.register(mercurius, {
    path: '/graphql',
    schema: mergedSchema,
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

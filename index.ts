import 'graphql-import-node';
import fastify from 'fastify';
import mercurius from 'mercurius';
import connectDB from './configuration/database';

// @ts-ignore
import postSchema from './graphql/schemas/post.schema.graphql';
import authSchema from './graphql/schemas/auth.schema.graphql';

import postResolvers from './graphql/resolvers/post.resolvers';
import authResolvers from './graphql/resolvers/auth.resolvers';

import { makeExecutableSchema } from '@graphql-tools/schema';

const mergedSchema = makeExecutableSchema({
  typeDefs: [authSchema, postSchema],
  resolvers: [authResolvers, postResolvers],
});

async function main() {
  await connectDB();

  const server = fastify({ logger: true });

  server.get('/', (request, reply) => {
    reply.send({ test: true });
  });

  server.register(mercurius, {
    path: '/graphql',
    schema: mergedSchema,
    graphiql: true,
    context: async (request, reply) => {
      return { request, reply };
    },
  });

  try {
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();

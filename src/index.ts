import 'graphql-import-node';
import fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from './schema';

async function main() {
  const server = fastify({ logger: true });

  server.get('/', (req, reply) => {
    reply.send({ test: true });
  });

  server.register(mercurius, {
    path: '/graphql',
    schema: schema,
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

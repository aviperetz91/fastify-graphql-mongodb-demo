import { makeExecutableSchema } from '@graphql-tools/schema';
// @ts-ignore
import typeDefs from './schema.graphql';

const resolvers = {
  Query: {
    info: () => 'Test',
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

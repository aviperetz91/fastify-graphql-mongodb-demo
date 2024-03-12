import { makeExecutableSchema } from '@graphql-tools/schema';
// @ts-ignore
import typeDefs from './schema.graphql';

type Link = {
  id: string;
  url: string;
  description: string;
};

function getLinks(): Link[] {
  return [
    {
      id: '1',
      url: 'www.sample.com',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];
}

const resolvers = {
  Query: {
    info: () => `This is A GraphQL-Fastify server`,
    feed: () => getLinks(),
  },

  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

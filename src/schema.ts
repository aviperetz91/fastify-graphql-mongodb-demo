import { makeExecutableSchema } from '@graphql-tools/schema';
// @ts-ignore
import typeDefs from './schema.graphql';

type Link = {
  id: string;
  url: string;
  description: string;
};

const links: Link[] = [
  {
    id: 'link-0',
    url: 'www.sample.com',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

const resolvers = {
  Query: {
    info: () => `This is A GraphQL-Fastify server`,
    feed: () => links,
  },

  Mutation: {
    post: (parent: unknown, args: { description: string; url: string }) => {
      let idCount = links.length;
      const link: Link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

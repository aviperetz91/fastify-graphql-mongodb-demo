import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context.model';
import { PostController } from '../../controllers/post.controller';
import { IPost } from '../../models/post.model';
import { TokenPayload, validateAuthToken } from '../../middleware/validateAuthToken';

const postController = new PostController();

const postResolvers = {
  Query: {
    posts: async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<IPost[]> => {
      const posts: IPost[] = await postController.getAllPosts(args);
      return posts;
    },
    userPosts: async (parent: any, args: { userId: string }, context: Context, info: GraphQLResolveInfo): Promise<IPost[]> => {
      const posts: IPost[] = await postController.getPostsByUserId(args.userId);
      return posts;
    },
  },

  Mutation: {
    createPost: async (parent: any, inputData: { input: IPost }, context: Context, info: GraphQLResolveInfo): Promise<IPost> => {
      const tokenPayload: TokenPayload | undefined = await validateAuthToken(context.request, context.reply);
      const createdPost: IPost = await postController.createPost(inputData.input, (tokenPayload as TokenPayload).userId);
      return createdPost;
    },
  },
};

export default postResolvers;

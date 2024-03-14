import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context.model';
import { PostController } from '../../controllers/post.controller';
import { IPost } from '../../models/post.model';

const postController = new PostController();

const postResolvers = {
  Query: {
    userPosts: async (parent: any, args: { userId: number }, context: Context, info: GraphQLResolveInfo): Promise<IPost[]> => {
      const posts: IPost[] = await postController.getPostByUserId(args.userId, context);
      return posts;
    },
  },
};

export default postResolvers;

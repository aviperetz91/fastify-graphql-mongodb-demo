import { Context } from '../models/context.model';
import Post from '../models/post.model';

export class PostController {
  async getPostByUserId(userId: number, context: Context) {
    try {
      const posts = await Post.find({ userId });
      return posts;
    } catch (error) {
      console.error('Error during fetching user posts', error);
      throw new Error('Failed to fetch user posts');
    }
  }
}

import Post, { IPost } from '../models/post.model';

export class PostController {
  async getAllPosts(args: any) {
    try {
      const posts = await Post.find({});
      return posts;
    } catch (error) {
      console.error('Error during fetching posts', error);
      throw new Error('Failed to fetch posts');
    }
  }
  async getPostsByUserId(userId: number) {
    try {
      const posts = await Post.find({ userId });
      return posts;
    } catch (error) {
      console.error('Error during fetching user posts', error);
      throw new Error('Failed to fetch user posts');
    }
  }
  async createPost(postData: IPost, userId: string) {
    try {
      const newPost = new Post({ ...postData, userId: userId });
      await newPost.save();
      return newPost;
    } catch (error) {
      console.error('Error during creating post:', error);
      throw new Error('Failed to create post');
    }
  }
}

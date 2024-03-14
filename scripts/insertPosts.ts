import axios from 'axios';
import Post, { IPost } from '../models/post.model';
import connectDB from '../configuration/database';
import { DUMMY_POSTS_URI } from '../configuration/consts';

export const insertPosts = async () => {
  try {
    await connectDB();
    await Post.deleteMany();
    const postsRes = await axios.get(DUMMY_POSTS_URI as string);
    const postsObj = postsRes.data;
    const postsToDB: IPost[] = [];

    for (const post of postsObj.posts) {
      const newPost: IPost = {
        title: post.title,
        body: post.body,
        userId: post.userId,
        tags: post.tags,
        reactions: post.reactions,
      };

      postsToDB.push(newPost);
    }

    await Post.insertMany(postsToDB);
    console.log('Posts have been successfully added!');
  } catch (err) {
    console.log(err);
  }
};

insertPosts();

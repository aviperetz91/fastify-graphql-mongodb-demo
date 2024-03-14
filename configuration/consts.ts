import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const DUMMY_USERS_URI = process.env.DUMMY_USERS_URI;
export const DUMMY_POSTS_URI = process.env.DUMMY_POSTS_URI;

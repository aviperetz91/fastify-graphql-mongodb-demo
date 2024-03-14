import { Schema, model } from 'mongoose';

export interface IPost {
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: Number, required: true },
  tags: { type: [String], required: true },
  reactions: { type: Number, required: true },
});

export default model<IPost>('Post', postSchema);

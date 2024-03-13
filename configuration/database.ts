import mongoose from 'mongoose';
import { MONGO_URI } from './consts';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('Connected to mongoDB!');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

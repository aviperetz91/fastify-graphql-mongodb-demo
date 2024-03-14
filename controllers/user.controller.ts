import { Context } from '../models/context.model';
import User, { IUser } from '../models/user.model';

export class UserController {
  async getUsers(args: any, context: Context) {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.error('Error during fetching users', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: string, context: Context) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error during fetching user', error);
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData: IUser, context: Context) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error during creating user:', error);
      throw new Error('Failed to create user');
    }
  }
}

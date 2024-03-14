import { Context } from '../models/context.model';
import User from '../models/user.model';

export class UserController {
  async getUsers(args: any, context: Context) {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      throw new Error('Error during fetching users');
    }
  }

  async getUserById(args: any, context: Context) {
    try {
      const user = await User.findById(args.id);
      return user;
    } catch (error) {
      throw new Error('Error during fetching user');
    }
  }
}

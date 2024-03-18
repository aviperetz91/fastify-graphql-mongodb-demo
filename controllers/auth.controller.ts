import { Context } from '../models/context.model';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configuration/constants';

export class AuthController {
  async signup(userData: IUser, context: Context) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email is already registered');
      }
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const newUser = new User({ ...userData, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }

  async login(email: string, password: string, context: Context) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        `${SECRET_KEY}`,
        { expiresIn: '1h' }
      );
      return { token: token, userId: user.id };
    } catch (error) {
      console.error('Error during login', error);
      throw new Error('Failed to login');
    }
  }
}

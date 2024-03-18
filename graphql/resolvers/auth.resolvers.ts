import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context.model';
import { AuthController } from '../../controllers/auth.controller';
import { IUser, IAuthData } from '../../models/user.model';

const authController = new AuthController();

const authResolvers = {
  Query: {
    login: async (
      parent: any,
      args: { email: string; password: string },
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<IAuthData> => {
      const user = await authController.login(args.email, args.password, context);
      return user;
    },
  },

  Mutation: {
    signup: async (parent: any, inputData: { input: IUser }, context: Context, info: GraphQLResolveInfo): Promise<IUser | undefined> => {
      const user: IUser | undefined = await authController.signup(inputData.input, context);
      return user;
    },
  },
};

export default authResolvers;

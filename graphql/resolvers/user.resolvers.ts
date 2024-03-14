import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context.model';
import { UserController } from '../../controllers/user.controller';
import { IUser } from '../../models/user.model';

const userController = new UserController();

export const userResolvers = {
  Query: {
    users: async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<IUser[]> => {
      const users: IUser[] = await userController.getUsers(args, context);
      return users;
    },
    user: async (parent: any, args: { id: string }, context: Context, info: GraphQLResolveInfo): Promise<IUser> => {
      const user: IUser = await userController.getUserById(args.id, context);
      return user;
    },
  },

  Mutation: {
    createUser: async (parent: any, inputData: { input: IUser }, context: Context, info: GraphQLResolveInfo): Promise<IUser> => {
      const createdUser: IUser = await userController.createUser(inputData.input, context);
      return createdUser;
    },
  },
};

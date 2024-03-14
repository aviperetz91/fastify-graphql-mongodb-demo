import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context.model';
import { UserController } from '../../controllers/user.controller';

const userController = new UserController();

export const userResolvers = {
  Query: {
    users: (parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
      return userController.getUsers(args, context);
    },
    user: (parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
      return userController.getUserById(args, context);
    },
  },
};

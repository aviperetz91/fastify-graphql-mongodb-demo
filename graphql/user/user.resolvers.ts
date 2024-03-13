import User from '../../models/user.model';

async function getUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw new Error('Error during fetching users');
  }
}

export const userResolvers = {
  Query: {
    users: getUsers,
  },
};

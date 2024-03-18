import axios from 'axios';
import User, { IUser, IAddress } from '../models/user.model';
import connectDB from '../configuration/database';
import { DUMMY_USERS_URI } from '../configuration/constants';

export const insertUsers = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    console.log('Users have been deleted');
    const usersRes = await axios.get(DUMMY_USERS_URI as string);
    const usersObj = usersRes.data;
    const usersToDB: IUser[] = [];

    for (const user of usersObj.users) {
      const address: IAddress = {
        city: user.address.city,
        street: user.address.address,
        zipCode: user.address.postalCode,
        floor: 1,
        apartment: 1,
      };
      const newUser: IUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phone,
        image: user.image,
        addresses: [address],
      };

      usersToDB.push(newUser);
    }

    await User.insertMany(usersToDB);
    console.log('Users have been successfully added!');
  } catch (err) {
    console.log(err);
  }
};

insertUsers();

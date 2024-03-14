import axios from 'axios';
import User from '../models/user.model';
import connectDB from '../configuration/database';
import { DUMMY_USERS_URI } from '../configuration/consts';

interface Address {
  city: string;
  street: string;
  floor?: number;
  apartment?: number;
  zipCode?: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image?: string;
  addresses: Address[];
}

export const insertUsers = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    const usersRes = await axios.get(DUMMY_USERS_URI as string);
    const usersObj = usersRes.data;
    const usersToDB: User[] = [];

    for (const user of usersObj.users) {
      const address: Address = {
        city: user.address.city,
        street: user.address.address,
        zipCode: user.address.postalCode,
        floor: 1,
        apartment: 1,
      };
      const newUser: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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

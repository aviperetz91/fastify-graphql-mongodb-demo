import { Schema, model } from 'mongoose';

export interface IAddress {
  city: string;
  street: string;
  floor?: number;
  apartment?: number;
  zipCode?: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  image?: string;
  addresses?: IAddress[];
}

export interface IAuthData {
  token: string;
  userId: string;
}

const addressSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  street: { type: String, required: true },
  floor: { type: Number },
  apartment: { type: Number },
  zipCode: { type: String },
});

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  image: { type: String },
  addresses: [addressSchema],
});

export default model<IUser>('User', userSchema);

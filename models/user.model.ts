import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
    },
    apartment: {
      type: Number,
    },
    zipCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

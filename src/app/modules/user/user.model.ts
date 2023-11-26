import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrder,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// User's Sub-schemas
const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, trim: true, required: [true, 'Street is required'] },
  city: { type: String, trim: true, required: [true, 'City is required'] },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country is required'],
  },
});

const userOrderSchema = new Schema<TUserOrder>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

// User Schema
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  fullName: userFullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true, trim: true },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: { type: [String], required: true },
  address: { type: userAddressSchema, required: true },
  orders: { type: [userOrderSchema] },
});

// middleware for password hash
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// the static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// removes password field from response
// also removes other fields when creating user
userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id;
    delete ret.fullName._id;
    delete ret.__v;
    delete ret.address._id;
    delete ret.id;
    delete ret.orders;
  },
});

// Model defination
export const User = model<TUser, UserModel>('User', userSchema);

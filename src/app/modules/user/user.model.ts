import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrder,
} from './user.interface';

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

const userOrderSchema = new Schema<TUserOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

// User Schema
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters.'],
    maxlength: [20, 'Password should not be longer than 20 characters.'],
  },
  fullName: userFullNameSchema,
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'], trim: true },
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: true,
  },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: userAddressSchema, required: [true, 'Address is required'] },
  orders: { type: [userOrderSchema] },
});

// Model defination
export const User = model<TUser>('User', userSchema);

// export const User = model<TUser, UserModel>('User', userSchema);

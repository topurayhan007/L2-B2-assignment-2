import { TUser } from './user.interface';
import { User } from './user.model';

// create a user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);

  return result;
};

// fetch all users
const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $unset: [
        'fullName._id',
        'address._id',
        '_id',
        'hobbies',
        'isActive',
        'userId',
        'orders',
        '__v',
        'password',
      ],
    },
  ]);

  return result;
};

// fetch a single user
const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { _id: 0, orders: 0, password: 0, __v: 0 } },
      {
        $unset: [
          'fullName._id',
          'address._id',
          '_id',
          'orders',
          '__v',
          'password',
        ],
      },
    ]);

    return result;
  } else {
    return null;
  }
};

// update user using Id
const updateASingleUserInDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate({ userId: userId }, userData, {
      new: true,
    });

    return result;
  } else {
    return null;
  }
};

// delete a user
const deleteAUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndDelete({ userId: userId });
    return result;
  } else {
    return null;
  }
};

// get a user's orders
const getAUserOrdersFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      {
        $unset: [
          'fullName',
          'address',
          '_id',
          'hobbies',
          'isActive',
          'userId',
          '__v',
          'password',
          'email',
          'username',
          'age',
        ],
      },
    ]);
    return result;
  } else {
    return null;
  }
};

// total price
const getTotalPriceOfOrderFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { totalPrice: { $sum: '$orders.price' }, _id: 0 } },
    ]);

    return result[0];
  } else {
    return null;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateASingleUserInDB,
  deleteAUserFromDB,
  getAUserOrdersFromDB,
  getTotalPriceOfOrderFromDB,
};

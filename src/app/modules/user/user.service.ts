import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};

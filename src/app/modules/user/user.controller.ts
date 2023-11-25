/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || 'Error while creating user',
      error: {
        code: 400,
        description: 'Error while creating user',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message || 'Error while fetching users',
      error: {
        code: 400,
        description: 'Error while fetching users',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
};

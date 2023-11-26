/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  userValidationSchema,
  userOrderValidationSchema,
} from './user.validation';
import { UserServices } from './user.service';
import bcrypt from 'bcrypt';
import config from '../../config';

// create a user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // checking data for validation using zod
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
      message: error.issues[0].message || 'Error while creating user',
      error: {
        code: 400,
        description: 'Error while creating user',
      },
    });
  }
};

// fetch all user controller
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
      message: 'Error while fetching users',
      error: {
        code: 400,
        description: 'Error while fetching users',
      },
    });
  }
};

// fetch single user controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(parseInt(userId));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      // User not found
      res.status(404).json({
        status: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      status: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update a user's data controller
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId: userId } = req.params;
    const userData = req.body;

    // check if params userId matches with the update object userId
    if (parseInt(userId) === userData.userId) {
      // checking data for validation using zod
      const zodParsedData = userValidationSchema.parse(userData);

      // hash the password during update
      zodParsedData.password = await bcrypt.hash(
        zodParsedData.password,
        Number(config.bcrypt_salt_rounds),
      );

      const result = await UserServices.updateASingleUserInDB(
        parseInt(userId),
        zodParsedData,
      );

      if (result !== null) {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: result,
        });
      } else {
        // User not found
        res.status(404).json({
          status: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
    } else {
      // When params userId and body userId doesn't match
      res.status(404).json({
        status: false,
        message: 'User ID does not match with the input userID!',
        error: {
          code: 404,
          description: 'User ID does not match with the input userID!',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message:
        error.message || error.issues[0].message || 'Could not update user!',
      error: {
        code: 400,
        description: 'Could not update user!',
      },
    });
  }
};

// delete a user
const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteAUserFromDB(parseInt(userId));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      // User not found
      res.status(404).json({
        status: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: 'Could not delete user!',
      error: {
        code: 400,
        description: 'Could not delete user!',
      },
    });
  }
};

// Add a product to user's order
const addAProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const productData = req.body;

    // checking data for validation using zod
    const zodParsedData = userOrderValidationSchema.parse(productData);

    const result = await UserServices.addAProductToOrderIntoDB(
      parseInt(userId),
      zodParsedData,
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      // User not found
      res.status(404).json({
        status: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message:
        error.message || error.issues[0].message || 'Could not create order!',
      error: {
        code: 400,
        description: 'Could not create order!',
      },
    });
  }
};

// fetch a user's orders controller
const getAUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAUserOrdersFromDB(parseInt(userId));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      // User not found
      res.status(404).json({
        status: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: 'Could not fetch order!',
      error: {
        code: 400,
        description: 'Could not fetch order!',
      },
    });
  }
};

// get total price of a user's data
const getTotalPriceOfOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceOfOrderFromDB(
      parseInt(userId),
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      // User not found
      res.status(404).json({
        status: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: 'Could not calculate total!',
      error: {
        code: 400,
        description: 'Could not calculate total!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteAUser,
  getAUserOrders,
  getTotalPriceOfOrder,
  addAProductToOrder,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  userValidationSchema,
  userOrderValidationSchema,
} from './user.validation';
import { UserServices } from './user.service';

// create a user controller
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
    res.status(404).json({
      status: false,
      message: error.message || 'Error while creating user',
      error: {
        code: 404,
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
      message: error.message || 'Error while fetching users',
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
      message: error.message || 'User not found',
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
    const { user: userData } = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

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
  } catch (error: any) {
    res.status(404).json({
      status: false,
      message: error.message || 'Could not update user!',
      error: {
        code: 404,
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
    res.status(404).json({
      status: false,
      message: 'Could not delete user!',
      error: {
        code: 404,
        description: 'Could not delete user!',
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
    res.status(404).json({
      status: false,
      message: error.message || 'Could not fetch order!',
      error: {
        code: 404,
        description: 'Could not fetch order!',
      },
    });
  }
};

// get total price
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
    res.status(404).json({
      status: false,
      message: 'Could not calculate total!',
      error: {
        code: 404,
        description: 'Could not calculate total!',
      },
    });
  }
};

const addAProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { product: productData } = req.body;

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
    res.status(404).json({
      status: false,
      message: 'Could not create order!',
      error: {
        code: 404,
        description: 'Could not create order!',
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

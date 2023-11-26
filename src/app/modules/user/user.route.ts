import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// create user route
router.post('/', UserControllers.createUser);

// get all users route
router.get('/', UserControllers.getAllUsers);

// get a single user route
router.get('/:userId', UserControllers.getSingleUser);

// update a user route
router.put('/:userId', UserControllers.updateSingleUser);

// delete a user route
router.delete('/:userId', UserControllers.deleteAUser);

// create a user's order route
router.put('/:userId/orders', UserControllers.addAProductToOrder);

// get all orders of a user route
router.get('/:userId/orders', UserControllers.getAUserOrders);

// calculate total price of a user's order route
router.get('/:userId/orders/total-price', UserControllers.getTotalPriceOfOrder);

export const UserRoutes = router;

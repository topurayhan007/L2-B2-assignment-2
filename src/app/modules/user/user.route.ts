import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.delete('/:userId', UserControllers.deleteAUser);

router.post('/:userId/orders', UserControllers.addAProductToOrder);

router.get('/:userId/orders', UserControllers.getAUserOrders);

router.get('/:userId/orders/total-price', UserControllers.getTotalPriceOfOrder);

export const UserRoutes = router;

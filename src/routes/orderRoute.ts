import { Router } from 'express';

import OrderController from '../controllers/orderController';
import validateOrder from '../middlewares/orderMiddlewares';
import Token from '../middlewares/tokenMiddlewares';

const orderRoute = Router();

const orderController = new OrderController();

orderRoute.get('/', orderController.getAll);
orderRoute.post('/', Token, validateOrder, orderController.create);

export default orderRoute;
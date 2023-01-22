import { Router } from 'express';

import UserController from '../controllers/userController';
import validationUser from '../middlewares/userMiddlewares';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', userController.getAll);
userRoute.post('/', validationUser, userController.create);

export default userRoute;
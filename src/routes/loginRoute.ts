import { Router } from 'express';

import UserController from '../controllers/userController';
import { validateLogin } from '../middlewares/userMiddlewares';

const loginRoute = Router();

const userController = new UserController();

loginRoute.post('/', validateLogin, userController.getByUsername);

export default loginRoute;
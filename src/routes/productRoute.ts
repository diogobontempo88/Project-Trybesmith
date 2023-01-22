import { Router } from 'express';

import ProductController from '../controllers/productController';
import validationProduct from '../middlewares/productMiddlewares';

const productRoute = Router();

const productController = new ProductController();

productRoute.get('/', productController.getAll);
productRoute.post('/', validationProduct, productController.create);

export default productRoute;
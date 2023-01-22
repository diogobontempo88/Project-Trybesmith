import { NextFunction, Request, Response } from 'express';

function validateProductsid(
  productsIds: number[],
    
) {
  if (!productsIds) {
    const message = '"productsIds" is required';
    return ({ status: 400, message });
  }
  
  if (!Array.isArray(productsIds)) {
    const message = '"productsIds" must be an array';
    return ({ status: 422, message });
  }

  if (productsIds.length < 1) {
    const message = '"productsIds" must include only numbers';
    return ({ status: 422, message });
  }
  
  return null;
}

export default function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { productsIds } = req.body;
  
  const error = validateProductsid(productsIds);

  if (error) return res.status(error.status).json({ message: error.message });
  
  next();
}
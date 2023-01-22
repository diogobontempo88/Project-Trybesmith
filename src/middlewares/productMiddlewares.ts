import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/product';

function validateName(
  name: string,
    
) {
  if (!name) {
    const message = '"name" is required';
    return ({ status: 400, message });
  }
  
  if (typeof name !== 'string') {
    const message = '"name" must be a string';
    return ({ status: 422, message });
  }

  if (name.length < 3) {
    const message = '"name" length must be at least 3 characters long';
    return ({ status: 422, message });
  }
  
  return null;
}

function validateAmount(
  amount: string,
      
) {
  if (!amount) {
    const message = '"amount" is required';
    return ({ status: 400, message });
  }
    
  if (typeof amount !== 'string') {
    const message = '"amount" must be a string';
    return ({ status: 422, message });
  }

  if (amount.length < 3) {
    const message = '"amount" length must be at least 3 characters long';
    return ({ status: 422, message });
  }
    
  return null;
}

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, amount } = req.body as Product;
  
  let error = validateName(name);

  if (error) return res.status(error.status).json({ message: error.message });
  
  error = validateAmount(amount);

  if (error) return res.status(error.status).json({ message: error.message });

  next();
}
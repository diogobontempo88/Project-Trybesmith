import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv/config');

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) { 
  const secret:jwt.Secret = 'minhasenha';
  try {
    const token = req.headers.authorization;
    if (token) { 
      const user = jwt.verify(token, secret);
      req.body.user = user;
      return next();
    }
    return res.status(401).json({ message: 'Token not found' });
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
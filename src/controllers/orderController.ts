/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const order = await this.orderService.getAll();
    res.status(200).json(order);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, user } = req.body;
    const { id } = user;

    await this.orderService.create(id, productsIds);
    res.status(201).json({
      userId: id,
      productsIds,
    });
  };
}

export default OrderController;
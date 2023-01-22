import connection from '../models/connection';
import OrderModel from '../models/orderModel';
import Order from '../interfaces/order';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const order = await this.model.getAll();
    return order;
  }

  public async create(userId: number, productsIds: number []): Promise<void> {
    await this.model.create(userId, productsIds);
  }
}

export default OrderService;
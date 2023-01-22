import { Pool, ResultSetHeader } from 'mysql2/promise';
// import connection from './connection';
import Order from '../interfaces/order';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(`
        SELECT 
            o.id, 
            o.userId, 
            JSON_ARRAYAGG(p.id) AS productsIds
        FROM 
            Trybesmith.Orders AS o
        INNER JOIN 
            Trybesmith.Products AS p
        ON o.id = p.orderId
        GROUP BY o.id
        ORDER BY o.userId`);
    const [rows] = result;
    return rows as Order[];
  }

  public async create(userId: number, productsIds: number []): Promise<void> {
    const result = await this.connection
      .execute<ResultSetHeader>('INSERT INTO Trybesmith.Orders (userId) VALUES (?)', [userId]);
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    await Promise.all(productsIds.map(async (productId) => {
      const resultProduct = await this.connection
        .execute<ResultSetHeader>(
        `
        UPDATE Trybesmith.Products set orderId = ? where id = ?`,
        [insertId, productId],
      ); 
      return resultProduct;
    }));
  }
}
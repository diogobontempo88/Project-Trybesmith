import { Pool, ResultSetHeader } from 'mysql2/promise';
// import connection from './connection';
import User from '../interfaces/user';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async getByUsername(username: string, password: string): Promise<User[]> {
    const result = await this.connection
      .execute(
        'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
        [username, password],
      );
    const [rows] = result;
    return rows as User[];
  } 

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password ) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}
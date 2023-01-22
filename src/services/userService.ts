import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/userModel';
import User from '../interfaces/user';

class UserService {
  public model: UserModel;

  private secret:jwt.Secret = 'minhasenha';

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const user = await this.model.getAll();
    return user;
  }

  createToken(user: User): string {
    const Token = jwt.sign(user, this.secret);
    return Token;
  }

  public async create(user: User): Promise<string> {
    await this.model.create(user);
    return this.createToken(user);
  }

  public async getByUsername(username: string, password: string): Promise<string> {
    const result = await this.model.getByUsername(username, password);
    if (result.length > 0) { 
      const { id, classe, level } = result[0];
      return this.createToken({ id, classe, level, username, password }); 
    }
    return '';
  }
}

export default UserService;
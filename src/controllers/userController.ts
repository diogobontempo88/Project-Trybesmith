/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const user = await this.userService.getAll();
    res.status(200).json(user);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const token = await this.userService.create(user);
    res.status(201).json({ token });
  };

  public getByUsername = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.getByUsername(username, password);
    if (token.length === 0) { 
      return res.status(401).json({ message: 'Username or password invalid' }); 
    }
    res.status(200).json({ token });
  };
}

export default UserController;
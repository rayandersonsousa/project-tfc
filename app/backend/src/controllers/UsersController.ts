import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import IUsersService from '../interfaces/IUsersService';
import generateToken from '../middlewares/jwt';

export default class UsersController {
  private _service: IUsersService;

  constructor(service: IUsersService) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    try {
      const user = await this._service.login(email);

      if (await compare(password, user.password)) {
        const token = await generateToken(user);
        return res.status(200).json(token);
      }
    } catch {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
}

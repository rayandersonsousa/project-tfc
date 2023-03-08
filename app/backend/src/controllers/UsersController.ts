import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
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
      const regex = /\S+@\S+.\S+/;

      if (regex.test(email) || password.length < 6) throw new Error();

      const user = await this._service.login(email);

      if (compareSync(password, user.password as string)) {
        const token = generateToken({ email, password });

        return res.status(200).json({ token });
      }
    } catch {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

export default class auth {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      req.body = jwt.verify(authorization, SECRET as string);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }
}

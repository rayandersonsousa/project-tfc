import jwt = require('jsonwebtoken');

require('dotenv/config');

const SECRET = process.env.JTW_SECRET || 'inuyasha';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '5m',
  algorithm: 'HS256',
};

interface IPayload {
  email: string,
}

const generateToken = async (payload: IPayload) => {
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

export default generateToken;

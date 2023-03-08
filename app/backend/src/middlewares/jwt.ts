import jwt = require('jsonwebtoken');

require('dotenv/config');

const SECRET = process.env.JTW_SECRET;

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
};

interface IPayload {
  email: string,
  password: string,
}

const generateToken = (payload: IPayload) => {
  const token = jwt.sign(payload, SECRET as string, jwtConfig);
  return token;
};

export default generateToken;

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export function generateToken(payload: any, expiry: string) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: expiry,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.jwt.secret);
}

export function getTokenExpiry(token: string) {
  const { exp } = jwt.decode(token) as JwtPayload;
  return exp;
}

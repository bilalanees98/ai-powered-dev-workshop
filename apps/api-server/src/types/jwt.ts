import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { PowerUserRole } from 'types';

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  userName: string;
  role: PowerUserRole;
}
export interface JwtRequest extends Request {
  tokenPayload: CustomJwtPayload;
  token: string;
}

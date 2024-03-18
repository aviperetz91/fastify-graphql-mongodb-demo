import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configuration/constants';

export interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  userId: string;
}

export async function validateAuthToken(request: any, reply: any): Promise<TokenPayload | undefined> {
  try {
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }
    const tokenPayload = jwt.verify(token, `${SECRET_KEY}`);
    if (!tokenPayload) {
      throw new Error('Wrong token');
    } else {
      return tokenPayload as TokenPayload;
    }
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}

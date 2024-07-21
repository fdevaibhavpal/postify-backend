import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface AuthRequest extends Request {
  user?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  console.log("JWT_SECRET ",token )
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

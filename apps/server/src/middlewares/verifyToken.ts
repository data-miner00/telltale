import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedUser } from '../interfaces';
import { JWT_SECRET as jwtSecret } from '../settings';

export const verifyToken =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers['authorization'];

      if (!bearerToken) {
        return res.status(403).json({ message: 'No token provided' });
      }

      if (!jwtSecret) {
        return res.status(500).json({ message: 'could not find secret' });
      }
      const bearer = bearerToken.split(' ');
      const token = bearer[1];

      jwt.verify(token, jwtSecret, (error, decodedUser) => {
        if (error) {
          return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decodedUser as DecodedUser;

        next();
      });
    } catch (error) {}
  };

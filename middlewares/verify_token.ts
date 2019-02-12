import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const JWToken = req.headers.authorization;
  const cleanToken = JWToken.replace('Bearer ', '');

  jwt.verify(cleanToken, process.env.JWT_SECRET, (_, isValid) => {
    if(!isValid) {
      res.status(401).send({
        error: 'Unauthorized',
      });
    }
    next();
  });
};

export default verifyToken;
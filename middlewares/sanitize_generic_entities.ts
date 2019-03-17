import { Response, Request, NextFunction } from 'express';
import { verifyEntityOrFields } from '../utils/utils';
import { trim } from 'ramda';

const sanitizeGenericEntities = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    if (body.fields) {
      body.fields.forEach(element => {
        if (element.name) {
          verifyEntityOrFields(trim(element.name));
        }
      });
    }
    next();
  }
  catch (error) {
    res.status(404).send({ message: 'Invalid input' });
  }
};

export default sanitizeGenericEntities;
import { Response, Request, NextFunction } from 'express';
import { verifyEntityOrFields } from '../utils/utils';
import { trim, keys, contains } from 'ramda';
import { column_definitions } from '../controllers/entities_controller';

const _verifyFieldType = (type: string) => {
  const columnTypes = keys(column_definitions);
  if (!contains(type, columnTypes)) {
    throw new Error('Invalid input');
  }
}

const sanitize = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {

    if (body.name) {
      // if entity name is here
      verifyEntityOrFields(trim(body.name));
    }

    if (body.fields) {

      body.fields.forEach(element => {
        if (element.name) {
          verifyEntityOrFields(trim(element.name));
        }

        if (element.old_name) {
          verifyEntityOrFields(trim(element.old_name));
        }

        if (element.type) {
          _verifyFieldType(element.type);
        }
      });
    }

    next();
  }
  catch (error) {
    res.status(404).send({ message: 'Invalid input' });
  }
};

export default sanitize;
import { Response, Request, NextFunction } from 'express';
import Database from '../models/index';
import { reduce, map } from 'ramda';
import { verifyEntityOrFields, removeCommaFromQuery } from '../utils/utils';
import DatabasePool from '../DatabasePool';
import { Pool } from 'pg';

const column_definitions: Record<UIControlType, string> = {
  checkmark_input: 'BOOLEAN NOT NULL',
  text_input: 'TEXT NOT NULL',
  date_input: 'DATE NOT NULL',
}

export default class EntitiesController {
  private pool: Pool;
  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }

  public createEntity = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: EntityRequestBody = req.body;

    if (reqBody.name.length === 0 || reqBody.fields.length === 0) {
      res.status(404).send({ message: 'Invalid input' });
      return;
    }

    try {
      // validity checks
      verifyEntityOrFields(reqBody.name);
      reqBody.fields.forEach(field => {
        verifyEntityOrFields(field.name);
      });

      const tableDefinition = reduce((acc: string, elem: EntityField) => {
        let columnType = null;

        switch (elem.type) {
          case 'checkmark_input':
            columnType = column_definitions['checkmark_input'];
            break;

          case 'date_input':
            columnType = column_definitions['date_input'];
            break;

          case 'text_input':
            columnType = column_definitions['text_input'];
            break;
        }
        return acc + elem.name + ' ' + columnType + ', ';
      }, '')(reqBody.fields);

      const queryText = `
      CREATE TABLE ${process.env.USER_TABLE_PREFIX}${reqBody.name} (
        id SERIAL PRIMARY KEY,
        page_id INTEGER REFERENCES "public"."Pages" (id),
        ${removeCommaFromQuery(tableDefinition)} 
      );
    `;

      await this.pool.query(queryText);

      // create table
      const entity = await Database.Entity.create({
        name: reqBody.name,
      });

      // For every field we add a record in UIControl table with foreign key to entity record
      reqBody.fields.forEach(async (field: EntityField) => {
        await Database.UIControl.create({
          name: field.name,
          type: field.type,
          entity_id: entity.id,
        });
      });

      const response = await Database.Entity.all();

      res.status(200).send({
        data: response,
      });

      // I call slice above to remove the last comma
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }

  public editEntity = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: EntityEditRequestBody = req.body;
    const entity_id = req.params.id;

    if (reqBody.fields.length === 0) {
      res.status(404).send({ message: 'Fields cannot be empty' });
      return;
    }

    try {
      const entity = await Database.Entity.find({
        where: {
          id: entity_id,
        }
      })


      const actions = reqBody.fields.reduce((acc: string, elem: EditEntityField) => {
        let actionText = '';
        switch (elem.action) {
          case 'add':
            verifyEntityOrFields(elem.name);
            actionText = 'ADD COLUMN ' + elem.name + ' ' + column_definitions[elem.type] + ', ';
            break;

          case 'drop':
            verifyEntityOrFields(elem.name);
            actionText = 'DROP COLUMN ' + elem.name + ' CASCADE ,';
            break;

          case 'rename':
            verifyEntityOrFields(elem.name);
            verifyEntityOrFields(elem.old_name);
            actionText = 'RENAME COLUMN ' + elem.old_name + ' TO ' + elem.name + ', ';
            break;

          case 'rename_table':
            verifyEntityOrFields(elem.name);
            actionText = 'RENAME TO ' + process.env.USER_TABLE_PREFIX + elem.name + ', ';
            break;

          default:
            res.status(404).send({
              message: 'Action provided was not found',
            });
            break;
        }
        return acc + actionText;
      }, ' ')

      let queryText = `ALTER TABLE ${process.env.USER_TABLE_PREFIX}${entity.name} ${removeCommaFromQuery(actions)}`;
      await this.pool.query(queryText);

      reqBody.fields.forEach(field => {
        switch (field.action) {
          case 'add':
            Database.UIControl.create({
              entity_id,
              name: field.name,
              type: field.type,
            });
            break;

          case 'drop':
            Database.UIControl.destroy({
              where: {
                name: field.name,
                entity_id,
              }
            });
            break;

          case 'rename':
            Database.UIControl.update({
              name: field.name,
            }, {
                where: {
                  name: field.old_name,
                }
              });
            break;

          case 'rename_table':
            Database.Entity.update({
              name: field.name,
            }, {
                where: {
                  id: entity_id,
                }
              });
            break;
        }
      });

      const response = await Database.Entity.all();

      res.status(200).send({
        data: response,
      });

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


  public dropEntity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity_id = req.params.id;

      const entity = await Database.Entity.find({
        where: {
          id: entity_id,
        }
      });

      await Database.UIControl.destroy({
        where: {
          entity_id,
        }
      })

      // Delete from Entities table
      await Database.Entity.destroy({
        where: {
          id: entity_id,
        }
      });

      // Delete the user table
      await this.pool.query(`DROP TABLE ${process.env.USER_TABLE_PREFIX}${entity.name}`);
      res.status(204).send();

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await Database.Entity.all();
      res.status(200).send({ data: entities });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  public fetchOne = async (req: Request, res: Response, next: NextFunction) => {
    const entity_id = req.params.id;
    try {
      const entity = await Database.Entity.find({
        where: {
          id: entity_id,
        },
        include: [Database.UIControl],
      });
      console.log(entity.get());

      if (entity) {
        res.status(200).send({ data: entity });
      } else {
        res.status(404).send({ message: 'Entity not found' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

};
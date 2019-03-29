import { Response, Request, NextFunction } from 'express';
import Database from '../models/index';
import { reduce, map, trim } from 'ramda';
import { removeCommaFromQuery } from '../utils/utils';

export const column_definitions: Record<UIControlType, string> = {
  checkmark_input: 'BOOLEAN NOT NULL',
  text_input: 'TEXT NOT NULL',
  date_input: 'DATE NOT NULL',
}

export const default_values: Record<UIControlType, string> = {
  checkmark_input: 'false',
  text_input: '\'\'',
  date_input: 'sysdate',
}

export default class EntitiesController {
  constructor() {
  }

  public createEntity = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: EntityRequestBody = req.body;

    if (reqBody.name.length === 0 || reqBody.fields.length === 0) {
      res.status(404).send({ message: 'Invalid input' });
      return;
    }

    try {
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


      // create table
      const entity = await Database.Entity.create({
        name: reqBody.name,
        template_id: reqBody.template,
      });

      // For every field we add a record in UIControl table with foreign key to entity record
      const fields = reqBody.fields.map((field: EntityField) => ({
        name: field.name,
        type: field.type,
        entity_id: entity.id,
      }));

      await Database.UIControl.bulkCreate(fields);

      await Database.sequelize.query(queryText);

      // Fetch the saved entity including UIControls 
      const response = await Database.Entity.find({
        where: {
          id: entity.id,
        },
        include: [Database.UIControl],
      });

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
      });

      const promises = [];

      const actions = map((elem: EditEntityField) => {
        let actionText = `ALTER TABLE ${process.env.USER_TABLE_PREFIX}${entity.name}`;
        const elementName = trim(elem.name);

        switch (elem.action) {
          case 'add':
            promises.push(Database.UIControl.create({
              entity_id,
              name: elementName,
              type: elem.type,
            }));

            console.log(`${actionText} ADD COLUMN ${elementName} ${column_definitions[elem.type]} DEFAULT ${default_values[elem.type]};`);

            return `${actionText} ADD COLUMN ${elementName} ${column_definitions[elem.type]} DEFAULT ${default_values[elem.type]};`;
          case 'drop':
            promises.push(Database.UIControl.destroy({
              where: {
                name: elementName,
                entity_id,
              }
            }));
            return `${actionText} DROP COLUMN ${trim(elementName)} CASCADE;`;
          case 'rename':
            const oldName = trim(elem.old_name);
            promises.push(Database.UIControl.update({ name: elementName }, {
              where: {
                name: oldName,
                entity_id: entity_id,
              }
            }));

            return `${actionText} RENAME COLUMN ${oldName} TO ${elementName};`;
          case 'rename_table':
            promises.push(Database.Entity.update({ name: elementName }, {
              where: {
                id: entity_id,
              }
            }));

            return `${actionText} RENAME TO  ${process.env.USER_TABLE_PREFIX}${elementName};`;
          default:
            res.status(404).send({
              message: 'Action provided was not found',
            });
            break;
        }
      })(reqBody.fields);
      console.log(actions);

      actions.forEach(action => {
        promises.push(Database.sequelize.query(action));
      });

      await Promise.all(promises);

      const response = await Database.Entity.find({
        where: {
          id: entity_id,
        },
        include: [Database.UIControl],
      });

      console.log(response.toJSON());

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
      await Database.sequelize.query(`DROP TABLE ${process.env.USER_TABLE_PREFIX}${entity.name}`);
      res.status(204).send({});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await Database.Entity.all({
        include: [Database.UIControl],
      });
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
import { Response, Request, NextFunction } from 'express';
import { map, prop, compose, reduce } from 'ramda';
import { verifyEntityOrFields, removeCommaFromQuery, appendTablePrefix } from '../utils/utils';
import EntityService from '../services/entity_service';
import GenericService from '../services/generic_service';
import { QueryResult } from 'pg';


export default class GenericController {
  private EntityService = null;
  private GenericService = null;

  constructor() {
    this.EntityService = new EntityService();
    this.GenericService = new GenericService();
  }

  /**
   * Adds a record in the generic entity 
   */
  public createRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;
    const { entity_id } = req.params;

    const entity = await this.EntityService.find({
      where: {
        id: entity_id,
      }
    });

    try {
      const keys = compose(
        removeCommaFromQuery,
        reduce(
          (acc: string, elem: GenericFieldType) => {
            return acc + elem.name + ',';
          }, '')
      )(reqBody.fields);


      let i = 0;
      const placeholders = compose(
        removeCommaFromQuery,
        reduce(
          (acc: string, elem: GenericFieldType) => {
            i += 1;
            return acc + '$' + i + ',';
          }, '')
      )(reqBody.fields);

      const values = reqBody.fields.map(field => field.value);

      const queryText = `INSERT INTO ${process.env.USER_TABLE_PREFIX}${entity.name} (${keys}) VALUES (${placeholders}) RETURNING *`;

      const result: QueryResult = await this.GenericService.query(queryText, values);

      res.status(200).send({
        result: result.rows,
      });

    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        message: error.message,
      });
    }

  };

  /**
   * Modifies a record with from the generic entity
   */
  public editRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;

    const { entity_id } = req.params;

    const entity = await this.EntityService.find({
      where: {
        id: entity_id,
      }
    });

    try {
      let i = 0;
      const changes = compose(
        removeCommaFromQuery,
        reduce(
          (acc: string, elem: GenericFieldType) => {
            i += 1;
            return acc + elem.name + '=' + '$' + i + ',';
          }, ''),
      )(reqBody.fields);

      i += 1;
      const queryText = `UPDATE ${process.env.USER_TABLE_PREFIX}${entity.name} SET ${changes} WHERE id=$${i};`;
      const values = map(prop('value'), reqBody.fields);

      const result = await this.GenericService.query(queryText, [...values, req.params.record_id]);
      res.status(200).send({
        result,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }

  };

  /**
   * Deletes a record from the generic entity with the name provided in body
   */
  public deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;

    const { entity_id } = req.params;

    const entity = await this.EntityService.find({
      where: {
        id: entity_id,
      }
    });

    try {
      const queryText = `DELETE FROM ${process.env.USER_TABLE_PREFIX}${entity.name} WHERE id=$1`;

      const result = await this.GenericService.query(queryText, [req.params.record_id]);

      res.status(200).send({
        result,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { entity_id } = req.params;

      const entity = await this.EntityService.find({
        where: {
          id: entity_id,
        }
      });
      const result = await this.GenericService.query(`SELECT * FROM ${appendTablePrefix(entity.name)}`);
      res.status(200).send({ data: result.rows });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };
  public fetchOne = async (req: Request, res: Response, next: NextFunction) => {
    const { record_id, entity_id } = req.params;

    const entity = await this.EntityService.find({
      where: {
        id: entity_id,
      }
    });

    try {
      verifyEntityOrFields(entity.name);
      const result = await this.GenericService.query(`SELECT * FROM ${appendTablePrefix(entity.name)} WHERE id = $1`, [record_id]);

      if (result) {
        res.status(200).send({ data: result.rows });
      } else {
        res.status(404).send({ message: 'Row not found' });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };
}
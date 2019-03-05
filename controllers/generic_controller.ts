import { Response, Request, NextFunction } from 'express';
import { Pool } from 'pg';
import { map, prop, compose, reduce } from 'ramda';
import { verifyEntityOrFields, removeCommaFromQuery, appendTablePrefix } from '../utils/utils';
import DatabasePool from '../DatabasePool';


export default class GenericController {
  private pool: Pool;

  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }

  /**
   * Adds a record in the generic entity 
   */
  public createRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;
    try {
      verifyEntityOrFields(reqBody.entity_name);

      const keys = compose(
        removeCommaFromQuery,
        reduce(
          (acc: string, elem: GenericFieldType) => {
            verifyEntityOrFields(elem.name);
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

      const queryText = `INSERT INTO ${process.env.USER_TABLE_PREFIX}${reqBody.entity_name} (${keys}) VALUES (${placeholders})`;
      console.log(queryText, values);

      const result = await this.pool.query(queryText, values);

      res.status(200).send({
        result,
      });

    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        error: error.message,
      });
    }

  };

  /**
   * Modifies a record with from the generic entity
   */
  public editRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;
    try {
      verifyEntityOrFields(reqBody.entity_name);

      let i = 0;
      const changes = compose(
        removeCommaFromQuery,
        reduce(
          (acc: string, elem: GenericFieldType) => {
            verifyEntityOrFields(elem.name);
            i += 1;
            return acc + elem.name + '=' + '$' + i + ',';
          }, ''),
      )(reqBody.fields);

      i += 1;
      const queryText = `UPDATE ${process.env.USER_TABLE_PREFIX}${reqBody.entity_name} SET ${changes} WHERE id=$${i};`;
      const values = map(prop('value'), reqBody.fields);

      console.log(queryText, [...values, req.params.record_id]);

      const result = await this.pool.query(queryText, [...values, req.params.record_id]);
      res.status(200).send({
        result,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }

  };

  /**
   * Deletes a record from the generic entity with the name provided in body
   */
  public deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    const reqBody: GenericRequestBody = req.body;
    try {
      verifyEntityOrFields(reqBody.entity_name);
      const queryText = `DELETE FROM ${process.env.USER_TABLE_PREFIX}${reqBody.entity_name} WHERE id=$1`;
      console.log(queryText);

      const result = await this.pool.query(queryText, [req.params.record_id]);

      res.status(200).send({
        result,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  };

  public fetchAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { entity_name } = req.body;

      verifyEntityOrFields(entity_name);

      const result = await this.pool.query(`SELECT * FROM ${appendTablePrefix(entity_name)}`);
      res.status(200).send({ data: result.rows });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  };
  public fetchOne = async (req: Request, res: Response, next: NextFunction) => {
    const { entity_name } = req.body;
    const { record_id } = req.params;
    try {
      verifyEntityOrFields(entity_name);
      const result = await this.pool.query(`SELECT * FROM ${appendTablePrefix(entity_name)} WHERE id = $1`, [record_id]);
      if (result) {
        res.status(200).send({ data: result.rows });
      } else {
        res.status(404).send({ message: 'Row not found' });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  };
}
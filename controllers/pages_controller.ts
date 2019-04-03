import { Response, Request, NextFunction } from 'express';
import PagesService from '../services/pages_service';
import Database from '../models/index';

export interface CreateReqBody {
  label: string,
  link: string,
  entities: number[],
};

export default class PagesController {
  private PagesService: PagesService = null;

  constructor() {
    this.PagesService = new PagesService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const body: CreateReqBody = req.body;
    try {
      console.log(body);
      const page = await this.PagesService.addNew(body);

      res.status(200).send({ data: page.toJSON() });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await this.PagesService.destroy(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  public changeEntity = async (req: Request, res: Response, next: NextFunction) => {
    const { old_entity, new_entity } = req.body;
    const { id } = req.params;
    try {
      await this.PagesService.removeEntity(id, old_entity);
      await this.PagesService.addEntity(id, new_entity);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  public removeEntity = async (req: Request, res: Response, next: NextFunction) => {
    const { id, entity_id } = req.params;
    try {
      await this.PagesService.removeEntity(id, entity_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  public edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const page = await this.PagesService.edit(id, req.body);
      res.status(200).send({ data: page });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.PagesService.all({
        include: [{
          model: Database.Entity,
          attributes: ['id'],
        }],
      });

      res.status(200).send({ data });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
};
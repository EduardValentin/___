import { Request, Response, NextFunction } from 'express';
import * as extract from 'extract-zip';
import * as fs from 'fs';
import TemplateService from '../services/template_service';

export default class TemplatesController {
  private Service: TemplateService;

  constructor() {
    this.Service = new TemplateService();
  }

  createTemplate = async (req: Request, res: Response, next: NextFunction) => {
    const { body, file } = req;
    try {
      const dir = `${__dirname}/../../client/app/templates/${body.name}`;
      fs.mkdirSync(dir);
      extract(file.path, { dir }, (err) => {
        if (err) {
          fs.rmdir(dir, () => { });
          res.status(500).send({ message: err.message });
          return;
        }

        this.Service.insert({
          name: body.name,
          description: body.description,
        })
        res.status(204).send();
      });
    }
    catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTemplates = await this.Service.all();
      res.status(200).send({ data: allTemplates });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const template_id = req.params.id;
      await this.Service.delete(template_id);
      res.status(204).send();

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

}
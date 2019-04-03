import { Request, Response, NextFunction } from 'express';
import * as extract from 'extract-zip';
import * as fs from 'fs';
import TemplateService from '../services/template_service';
import * as rimraf from 'rimraf';

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
      extract(file.path, { dir }, async (err) => {
        if (err) {
          fs.rmdir(dir, () => { });
          console.log(err.message);
          res.status(500).send({ message: err.message });
          return;
        }

        const templateCreated = await this.Service.insert({
          name: body.name,
          description: body.description,
        })
        res.status(200).send({ data: templateCreated.toJSON() });
      });
    }
    catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
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
      const template = await this.Service.find({
        where: {
          id: template_id,
        }
      });

      const dir = `${__dirname}/../../client/app/templates/${template.name}`;
      rimraf(dir, async (error) => {
        if (error) {
          res.status(500).send({ message: error.message });
          return;
        }

        console.log(`Deleted template at path: ${dir}`);

        await this.Service.delete(template_id);
        res.status(204).send();
      });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

}
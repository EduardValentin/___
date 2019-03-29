import { Response, Request, NextFunction } from 'express';
import Database from '../models/index';

export default class SettingsController {
  public getSettings = async (req: Request, res: Response, next: NextFunction) => {
    let settings = await Database.Settings.all();
    res.status(200).send({
      data: settings,
    })
  };

  public getSetting = async (req: Request, res: Response, next: NextFunction) => {
    let setting = await Database.Settings.findOne({
      where: {
        setting_name: req.params.setting_name,
      }
    });

    if (setting) {
      res.status(200).send({
        data: setting,
      });
    } else {
      res.status(404).send();
    }

  };
}

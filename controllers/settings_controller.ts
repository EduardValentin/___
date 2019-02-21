import {Response, Request, NextFunction} from 'express'; 
import Database  from '../models/index';
import router from '../routes/User';

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  let settings = await Database.Settings.all();
  res.status(200).send({
    data: settings,
  })
};

export const getTemplate = async (req: Request, res: Response, next: NextFunction) => {
  let setting = await Database.Settings.findOne({
    where: {
      setting_name: 'Template',
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

import * as Express from 'express'
import UserRouter from './routes/user';
import SettingsRouter from './routes/settings';
import EntitiesRouter from './routes/entities';
import GenericRouter from './routes/generic';
import verifyToken from './middlewares/verify_token';
import * as Path from 'path'
import DatabasePool from './DatabasePool';

class App {
  public express: Express.Application;

  constructor() {
    this.express = Express();
    this.express.use(Express.json())
    this.mountRoutes();
  }

  mountRoutes() {
    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });

    this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
    this.express.use('/api/v1/users', UserRouter);
    this.express.use('/api/v1/settings', SettingsRouter);
    this.express.use('/api/v1/entities', EntitiesRouter);
    this.express.use('/api/v1/generic_entities', GenericRouter);

  }

}

export default new App().express;
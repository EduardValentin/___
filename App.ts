import * as Express from 'express'
import UserRouter from './routes/user';
import SettingsRouter from './routes/settings';
import EntitiesRouter from './routes/entities';
import GenericRouter from './routes/generic';
import TemplatesRouter from './routes/templates';
import * as Path from 'path'

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
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      next();
    });

    this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
    this.express.use('/api/v1/users', UserRouter);
    this.express.use('/api/v1/settings', SettingsRouter);
    this.express.use('/api/v1/entities', EntitiesRouter);
    this.express.use('/api/v1/generic_entities', GenericRouter);
    this.express.use('/api/v1/templates', TemplatesRouter);
  }

}

export default new App().express;
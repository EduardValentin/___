import * as Express from 'express'
import UserRouter from './routes/User';
import verifyToken from './middlewares/verify_token';
import * as Path from 'path'

class App {
  public express : Express.Application;
  
  constructor () {
    this.express = Express();
    this.express.use(Express.json())
    this.mountRoutes();
  }

  mountRoutes() {
    this.express.use('/', Express.static(Path.join(__dirname, '/..','client', 'dist')));
    this.express.use('/api/users', UserRouter);
  } 

}

export default new App().express;
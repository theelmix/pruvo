import express from 'express';
import * as bodyParser from 'body-parser';
import "dotenv/config";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any[], PORT: number) {
    this.app = express();
    this.port = PORT;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller: { router: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>; }) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`Pruvo listening on the port ${this.port}`);
    });
  }
}

export default App;
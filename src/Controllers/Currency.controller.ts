import * as express from "express";
import QueueController from "./Queue";
import Task from "../Models/Task.interface";
const httpRequest = require("request");

class CurrencyController {
  private queue: QueueController;
  public path = "/currency";
  public router = express.Router();
  public API = process.env.API;
  public APPID = process.env.APPID;

  constructor() {
    this.intializeRoutes();
    this.queue = new QueueController();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllCurrencies);
    this.router.get(this.path + "/conversion-rate", this.getConversionRate);
  }

  public getAllCurrencies = (
    request: express.Request,
    response: express.Response
  ) => {
    httpRequest(this.API + "currencies.json", function (
      error: any,
      res: { statusCode: any },
      body: any
    ) {
      response.send(JSON.parse(body));
    });
  };

  public getConversionRate = (
    request: express.Request,
    response: express.Response
  ) => {
    const task: Task = {
      mailTo: request.query.mailTo ? request.query.mailTo.toString() : '',
      from: request.query.from ? request.query.from.toString() : '',
      to: request.query.to ? request.query.to.toString() : '',
      value: request.query.value ? parseInt(request.query.value.toString()) : 0,
    };

    // Changing Base Currency is currently available for clients on the Developer, Enterprise and Unlimited plans.
    console.info("task:", task)
    if (task.from === "USD") {
      // Getting the conversion rate is a long and CPU consuming task
      // So we defer the user requests and email the results  back to them once it is ready.
      this.queue.procesar(task);
      response.send({ data: "Sent to validation. We'll send you the result via email when ready." });
    } else {
      response.send({
        error: "Currency not allowed",
      });
    }
  };
}

export default CurrencyController;

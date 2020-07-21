import fastqueue from "fastq";
import httpRequest from "request";
import Task from '../Models/Task.interface';
import Mailer from './Mailer';

class QueueController {
  private concurrency = 100;
  private queue: any;
  private API = process.env.API;
  private APPID = process.env.APPID;
  private mail: Mailer;

  constructor() {
    this.queue = fastqueue(this, this.worker, this.concurrency);
    this.mail = new Mailer();
  }


  private worker(
    task: Task,
    cb: (arg0: any, arg1: any) => void
  ) {

    // Get the latest exchange rates available from the Open Exchange Rates API.
    httpRequest(
      this.API + "latest.json?app_id=" + this.APPID + "&base=" + task.from,
      (error: any, res: { statusCode: any }, body: string) => {
        if (error || res.statusCode !== 200) {
          console.error(JSON.parse(body).description);
          return cb('Error procesing Task', null);
        } else {
          const rates = JSON.parse(body).rates;
          let rate = Math.round((rates[task.to] + Number.EPSILON) * 100) / 100;
          this.mail.enviarmail(task.mailTo, rate);
          cb(null, "Rate: " + rate + " TO: " + task.to + " Conversion: " + task.value * rate);
        }
      }
    );
  }

  public procesar(conversion: Task): boolean {
    this.queue.push(conversion, (err: any, result: any) => {
      if (err) {
        console.error("ERROR", err);
        return false;
      }
      
      console.info("the result is", result);
    });
    return true;
  }
}

export default QueueController;

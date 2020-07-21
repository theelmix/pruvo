import App from './app';
import CurrencyController from './Controllers/Currency.controller';
const PORT = parseInt(process.env.PORT || '4000');

const app = new App(
  [
    new CurrencyController()
  ],
  PORT,
);

app.listen();
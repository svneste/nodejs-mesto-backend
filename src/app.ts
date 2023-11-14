import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routerUsers from './routes/users';
import routerCards from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '654bd39e8dd5c56b192dceb7',
  };

  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

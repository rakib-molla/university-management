/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application,  Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello your server is running ');
});

app.use(globalErrorHandler)

// not found route http status npm
app.use(notFound);

export default app;

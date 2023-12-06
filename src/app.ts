import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/config/modules/student/student.route';
import { UserRoutes } from './app/config/modules/user/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello your server is running ');
});

export default app;

import express, { Request, Response } from 'express';
import cors from "cors";
import { userRouter } from './app/module/user/user.router';
const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/v1/users',userRouter)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;
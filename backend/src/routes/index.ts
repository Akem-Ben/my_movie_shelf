import { Router } from 'express';
import userRouter from './userRoutes/userRoutes';
import movieRouter from "./movieRoutes/movieRoutes";

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/movies', movieRouter);

export default rootRouter;
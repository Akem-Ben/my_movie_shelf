import { Router } from 'express';
import userRouter from './userRoutes/userRoutes';
import adminRouter from "./adminRoutes/adminRoutes";
import movieRouter from "./movieRoutes/movieRoutes";

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/movies', movieRouter);
rootRouter.use('/admin', adminRouter);

export default rootRouter;
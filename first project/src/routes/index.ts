import { Router } from 'express';
import userRoute from './user.routes.ts';
import postRoute from './post.routes.ts';

const router = Router();


router.use('/users', userRoute);
router.use('/posts', postRoute);


export default router;
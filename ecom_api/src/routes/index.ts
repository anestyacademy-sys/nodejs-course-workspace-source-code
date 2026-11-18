import { Router } from "express";
import productRoute from './products.routes.ts';
import categoryRoute from './category.routes.ts';
import userRoute from './user.routes.ts';
const router = Router();


router.use('/products', productRoute );
router.use('/categories', categoryRoute);
router.use('/users', userRoute);


export default router;
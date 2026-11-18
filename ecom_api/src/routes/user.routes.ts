import { Router } from 'express';
import { register, login } from '../controllers/user.controllers.ts';
import { validateBody } from '../middleware/validate.middleware.ts';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema.ts';


const router = Router();


router.post('/register',validateBody(registerUserSchema), register);
router.post('/login',validateBody(loginUserSchema), login);



export default router;
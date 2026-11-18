import { Router } from 'express';

import { listUser, createUser, getById } from '../controllers/user.controllers.ts';

const router = Router();


router.get('/list', listUser );

router.post('/create', createUser );

router.get('/getbyid/:id', getById );




export default router;
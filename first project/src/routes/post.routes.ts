import { Router } from 'express';
import { listPost, getById, createPost, editPost, deletePost } from '../controllers/post.controllers.ts';
const router = Router();



// Post work


router.get('/list', listPost)

router.get('/:id', getById)

router.post('/', createPost)

router.put('/:id', editPost)

router.delete('/:id', deletePost)



export default router;
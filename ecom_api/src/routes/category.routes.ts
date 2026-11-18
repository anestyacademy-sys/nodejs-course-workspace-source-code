import { Router } from "express";
import { listCategory, getCategoryById, createCatgory, editCategory, deleteCategory } from "../controllers/category.controllers.ts";
import { validateBody, validateParams } from "../middleware/validate.middleware.ts";
import { categoryIdSchema, createCategorySchema, editCategorySchema } from "../schemas/category.schema.ts";


const router = Router();


router.get('/list', listCategory);
router.get('/byid/:id', validateParams(categoryIdSchema) , getCategoryById);
router.post('/create', validateBody(createCategorySchema) , createCatgory);
router.put('/edit/:id',validateParams(categoryIdSchema), validateBody(editCategorySchema) , editCategory);
router.delete('/delete/:id',validateParams(categoryIdSchema),  deleteCategory);




export default router;
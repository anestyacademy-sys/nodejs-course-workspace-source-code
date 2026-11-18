import { Router } from "express";
import { listProduct, getProductById, createProduct, editProduct, deleteProduct } from "../controllers/product.controllers.ts";
import { validateBody, validateParams } from "../middleware/validate.middleware.ts";
import { createProductSchema, editProductSchema, productIdSchema } from "../schemas/product.schema.ts";
import { authenticate, authorize } from "../middleware/auth.middleware.ts";
import { upload } from "../config/multer.ts";
const router = Router();


router.get('/list', listProduct);
router.get('/byid/:id', validateParams(productIdSchema) , getProductById);
router.post('/create', authenticate , authorize('admin') , upload.single('image') ,  validateBody(createProductSchema) , createProduct);
router.put('/edit/:id',authenticate,  validateParams(productIdSchema)  ,validateBody(editProductSchema) , editProduct);
router.delete('/delete/:id',authenticate , validateParams(productIdSchema) , deleteProduct);


export default router;
import type { Request, Response } from 'express';
import type { productParams, createProductBody, editProductBody, productQuery } from '../types/product.types.ts';

import { Product } from '../models/product.models.ts'

import { sendSuccess, sendBadRequest, sendCreated, sendNoContent, sendNotFound } from "../utils/response.ts";
import { Category } from '../models/category.models.ts';
import type { CreateProductInput, EditProductInput, ProductIdInput } from '../schemas/product.schema.ts';


export const listProduct = async ( req: Request<any, any, any, productQuery>, res: Response )=>{

    try {

        const filters = req.query;
        
        const filter : any = {};

        if(filters.min || filters.max ){
            filter.price = {};

            if(filters.min){
                filter.price.$gt = parseFloat(filters.min);
            }
            if(filters.max){
                filter.price.$lt = parseFloat(filters.max);
            }
        }
        
        const list = await Product.find( filter ).populate('categoryId', 'name description')

        sendSuccess(res, list, 'list of products')
        
    } catch (error) {
        sendBadRequest(res, 'error in list ', error) 
    }

}


export const getProductById = async (req: Request<ProductIdInput>  , res: Response)=>{
    try {

        const { id } = req.params;
        const prod = await Product.findById(id).populate('categoryId', 'name description')

        if(!prod){
            sendNotFound(res, 'product not found');
            return;
        }
        
        sendSuccess(res, prod, 'detail products')

    } catch (error) {
        console.log(error);
        
        sendBadRequest(res, 'error in details ', error) 
    }

}


export const createProduct = async ( req: Request<any, any, CreateProductInput>, res: Response )=>{

     try {
        

        console.log(req.file);
        

        const imgPath = req.file ? `/uploads/products/${req.file.filename}` : null;

        const prod = new Product(req.body);
        prod.image = imgPath;

        await prod.save();
        sendCreated(res, prod, 'product created');

    } catch (error) {
        console.log(error);
        
        sendBadRequest(res, 'error in creation ', error) 
    }


}

export const editProduct = async ( req: Request<ProductIdInput, any, EditProductInput>, res: Response )=>{

    try {

        const {id}= req.params;
        const updates = req.body;

        const upt = await Product.findByIdAndUpdate( id, updates, { new: true } );

        if(!upt){
            sendNotFound(res, 'product not found');
            return;
        }

        sendSuccess(res, upt, 'edit product')
        
    } catch (error) {
        sendBadRequest(res, 'error in edit ', error) 
    }


}

export const deleteProduct = async (req: Request<ProductIdInput> , res: Response)=>{

     try {

        const { id } = req.params;
        const prod = await Product.findByIdAndDelete(id);

        if(!prod){
            sendNotFound(res, 'product not found');
            return;
        }

        sendNoContent(res)
        
    } catch (error) {
        sendBadRequest(res, 'error in delete ', error) 
    }


}
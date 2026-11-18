
import type { Request, Response } from "express";


import { Category } from "../models/category.models.ts";

import { sendSuccess, sendBadRequest, sendCreated, sendNoContent, sendNotFound } from "../utils/response.ts";
import { Product } from "../models/product.models.ts";
import type { CategoryIdInput, CreateCategoryInput, EditCategoryInput } from "../schemas/category.schema.ts";

// find
export const listCategory = async (req: Request, res: Response)=>{
    try {
        
        const categories = await Category.find({  }); 
        sendSuccess(res, categories, 'list of categories')
    } catch (error) {
        sendBadRequest(res, 'error in list ', error) 
    }
}


// findOne
// findById
export const getCategoryById = async (req: Request<CategoryIdInput>, res: Response)=>{
    try {
        
        const cat = await Category.findById(req.params.id).populate('products').populate('productCount')
        // const cat = await Category.findOne({ _id: req.params.id })

        if(!cat){
            sendNotFound(res, 'category not found');
            return;
        }

        sendSuccess(res, cat, 'detail category')

    } catch (error) {
        sendBadRequest(res, 'error in details ', error) 

    }
}


export const createCatgory = async (req: Request<any, any, CreateCategoryInput>, res: Response)=>{
    
    try {

        const cat = new Category( req.body )
        
      

        await cat.save();
        sendCreated(res, cat, 'category created');

    } catch (error) {
        sendBadRequest(res, 'error in creation ', error)   
    }
    
}

export const editCategory = async (req: Request<CategoryIdInput, any, EditCategoryInput>, res: Response)=>{
    try {

        const { id } = req.params;
        const updates = req.body;

        const updatedCategory = await Category.findByIdAndUpdate( id , updates , { new : true } )

        if(!updatedCategory){
            sendNotFound(res, 'category not found');
            return;
        }

        sendSuccess(res, updatedCategory, 'edit category')

        
    } catch (error) {
        sendBadRequest(res, 'error in update ', error)     
    }
}

export const deleteCategory =async (req: Request<CategoryIdInput>, res: Response)=>{
    try {
        
        const { id } = req.params;
        const cat = await Category.findByIdAndDelete(id);

        if(!cat){
            sendNotFound(res, 'category not found');
            return;
        }

        sendNoContent(res);

    } catch (error) {
        sendBadRequest(res, 'error in delete ', error) 
 
    }
}
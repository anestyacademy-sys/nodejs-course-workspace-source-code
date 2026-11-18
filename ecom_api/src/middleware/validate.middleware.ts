import type { Request, Response , NextFunction } from 'express';
import { sendBadRequest } from '../utils/response.ts';
import type { ZodError } from 'zod';




export const validateBody = <T>(schema: any) =>{

    return (req: Request, res: Response, next: NextFunction): void =>{

        try {
            
            const result = schema.safeParse(req.body);

            if(!result.success){                
                const errors = formatZodErrors(result.error);
                console.log(errors);
                
                return sendBadRequest(res, 'validation failed', errors);
            }

            req.body = result.data as T;
            next();

        } catch (error) {
            
            sendBadRequest(res, 'validation error')

        }

    }

}


export const validateParams = <T>(schema: any) =>{

    return (req: Request, res: Response, next: NextFunction): void =>{

        try {
            
            
            const result = schema.safeParse(req.params);

            if(!result.success){
                const errors = formatZodErrors(result.error);
                return sendBadRequest(res, 'invalid params', errors);
            }

            req.params = result.data;
            next();


        } catch (error) {
            
            sendBadRequest(res, 'validation error')

        }

    }

}


const formatZodErrors = (error: any)=>{ 
    
    
    return error.issues.map((err:any)=>{
              
        return {
            field: err.path.join('.'),
            message: err.message
        }

    })
}
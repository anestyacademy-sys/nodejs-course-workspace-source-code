import type { Request, Response , NextFunction } from 'express';

import { verifyToken } from '../utils/jwt.ts';
import type { JwtPayload } from 'jsonwebtoken';

import { sendBadRequest } from '../utils/response.ts';


export interface AuthRequest extends Request {
    user?: JwtPayload
}


export const authenticate = ( req: AuthRequest,res: Response, next: NextFunction ) : void =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ') ){
            res.status(401).json({
                success: false,
                error: 'No token provided, please login'
            })
            return;
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        if(!decoded){
            res.status(401).json({
                success: false,
                error: 'No token provided, please login'
            })

            return;
        }

        req.user = decoded;
        next();
        
    } catch (error) {
        
        res.status(401).json({
            success: false,
            error: 'Authentication failed'
        })
    }

}


export const authorize = ( ...allowedRoles: string[] )=>{

    return (req: AuthRequest, res: Response, next: NextFunction): void =>{

        if(!req.user){
            res.status(401).json({
                success: false,
                error: 'Not authenticated'
            });
            return;
        }

        if(!allowedRoles.includes(req.user.role)){
            res.status(403).json({
                success:false,
                error: 'you do not have permission to perform this action'
            });
            return;
        }


        next();


    }

}
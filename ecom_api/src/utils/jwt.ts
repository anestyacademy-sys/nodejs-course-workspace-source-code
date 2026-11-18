import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';

// payload interface

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}


export const generateToken = ( payload: JwtPayload ): string =>{

    return jwt.sign( payload, config.jwtSecret , { expiresIn: config.jwtExpireIn as any } )

}


export const verifyToken = (token: string) : JwtPayload | null  =>{

    try {
        
        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
        return decoded;

    } catch (error) {
        return null;
    }

}


export const decodeToken = (token: string) : JwtPayload | null  =>{

    try {
        
        const decoded = jwt.decode(token) as JwtPayload;
        return decoded;

    } catch (error) {
        return null;
    }

}
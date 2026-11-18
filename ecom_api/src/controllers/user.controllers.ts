import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { sendSuccess, sendBadRequest, sendCreated, sendNoContent, sendNotFound } from "../utils/response.ts";

import { User } from '../models/user.models.ts';
import type { LoginUserInput, RegisterUserInput } from "../schemas/user.schema.ts";
import { generateToken } from "../utils/jwt.ts";


export const register = async ( req: Request<any, any, RegisterUserInput >, res: Response )=>{

    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email })
        if(existingUser){
           return sendBadRequest(res, 'Email already registered');
        }

        const usr = new User({ name, email, password });
        await usr.save();

        sendCreated(res, usr, 'user registered successfully !');
        
    } catch (error) {
        sendBadRequest(res, 'error in registration', error);
    }

}


export const login = async ( req: Request<any, any, LoginUserInput >, res: Response )=>{

    try {

        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return sendBadRequest(res, 'Invalid email or password');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return sendBadRequest(res, 'Invalid email or password');
        }

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        })

        const userResponse = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
            token
        }

        sendSuccess(res, userResponse, 'Login successful!')
        
    } catch (error) {
        sendBadRequest(res, 'error in login', error);
    }

}


export const createAdminAccount = async ()=>{


    try {
        
        const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });

        if(existingAdmin){
            console.log('Admin Already created !');
            return;
        }

        const admin = new User({ name: 'Admin user', email: 'admin@gmail.com', password: 'admin123', role: 'admin' })

        await admin.save();

        console.log('Admin created successfully !!');
        

    } catch (error) {
        console.log(error);
    }

}
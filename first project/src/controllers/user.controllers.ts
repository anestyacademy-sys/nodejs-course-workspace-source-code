import type { Request, Response } from 'express';


export const listUser = (req: Request, res: Response) => {
    res.json({ message: 'Get all users' });
}



export const createUser = (req: Request, res: Response) => {
    res.json({ message: 'Create user' });
}


export const getById = (req: Request, res: Response) => {
    res.json({ message: `Get user ${req.params.id}` });
}
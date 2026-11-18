import type { Response } from "express";



export const sendSuccess = ( res: Response, data: any, message?: string )=>{

    res.status(200).json({
        success: true,
        data,
        message: message ? message : 'success!'
    })

}


export const sendCreated = ( res: Response, data: any, message : string = 'Resource created successfully')=>{
    res.status(201).json({
        success: true,
        message,
        data
    })
}

export const sendNoContent = ( res: Response )=>{
    res.status(204).send();
}


export const sendBadRequest = ( res: Response, message: string = 'Bad request', details: any = {} )=>{
    res.status(400).json({
        success: false,
        error: message,
        details
    })
}


export const sendNotFound = ( res: Response , message: string = 'Resource not found' )=>{
    res.status(404).json({
        success: false,
        error: message
    })
}
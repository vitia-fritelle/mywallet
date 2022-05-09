import { NextFunction, Request, Response } from "express";
import config from "../config";
import { ApiError } from "../utils";

export const errorConverter = (
    err: any, 
    _req: Request, 
    _res: Response, 
    next: NextFunction) => {
    
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Not especified";
        error = new ApiError(statusCode, message, err.stack);
    }
    next(error);
};

export const errorHandler = (
    err: ApiError, 
    _req: Request, 
    res: Response) => {

    const { statusCode, message } = err;
    if (config.env === 'production') {
        res.sendStatus(500);
    } else {
        res.locals.errorMessage = err.message;
        const response = {
            code: statusCode,
            message,
            ...(config.env === 'development' && { stack: err.stack }),
        };
        if (config.env === 'development') {
            console.error(response);
        }
        res.status(statusCode).send(response);
    }
};
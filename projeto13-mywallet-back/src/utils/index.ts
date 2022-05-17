import { Request, Response, NextFunction } from 'express';

export const catchAsync = (
    (fn: (req:Request, res:Response, next:NextFunction) => any) => (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err));
    }
);

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message:string,
        public stack = 'Error',
    ) {
        super(message);
        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

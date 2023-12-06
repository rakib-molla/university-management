import { NextFunction, Request, RequestHandler, Response } from 'express';

// async catch function this is higher order function
const catchAsync = (fn: RequestHandler) => {
 return (req: Request, res: Response, next: NextFunction) => {
   Promise.resolve(fn(req, res, next)).catch((error) => next(error));
 };
};

export default catchAsync;
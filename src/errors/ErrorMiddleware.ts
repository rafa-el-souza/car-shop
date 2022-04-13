import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../interfaces';

export const errorMiddleware = (
  err: DomainError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(_next);
  console.error(err.error);
  return res.status(err.code || 500).json();
};

export default errorMiddleware;
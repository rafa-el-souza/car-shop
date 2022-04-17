import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { DomainError, StatusCodes as c } from '../interfaces';
import { ErrorMessage as m } from './ErrorMessages';

export const handleDomainError = (
  err: DomainError<null>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.code) {
    // console.error(err);
    return res.status(err.code).json({ error: err.message });
  }
  return next(err);
};

export const handleZodDomainError = (
  err: DomainError<ZodError>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.error(err.error?.flatten().fieldErrors);
  const firstIssue = err.error?.issues[0];
  if (err.error instanceof ZodError) {
    return res.status(c.badRequest)
      .json({ error: firstIssue?.message });
  }
  return next(err);
};

export const handleInternalError = (
  err: DomainError<null>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(_next);
  // console.error(err.error);
  return res.status(c.internal)
    .json({ error: m.internal });
};

export default {
  handleDomainError,
  handleZodDomainError,
};
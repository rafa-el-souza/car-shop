import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssueCode } from 'zod';

import { DomainError, StatusCodes as c } from '../interfaces';
import { ErrorMessage as m } from './ErrorMessages';

export const handleDomainError = (
  err: DomainError<null>,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.code) {
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
  console.error(err.error?.flatten().fieldErrors);
  const firstIssue = err.error?.issues[0];
  if (
    firstIssue?.code === ZodIssueCode.invalid_type
    || firstIssue?.code === ZodIssueCode.too_small
    || firstIssue?.code === ZodIssueCode.too_big
  ) {
    return res.status(c.badRequest)
      .json({ error: firstIssue.message });
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
  return res.status(c.internal)
    .json({ error: m.internal });
};

export default {
  handleDomainError,
  handleZodDomainError,
};
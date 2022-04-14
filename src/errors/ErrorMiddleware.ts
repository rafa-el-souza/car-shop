/* eslint-disable max-lines-per-function */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssueCode } from 'zod';

import { DomainError, StatusCodes } from '../interfaces';

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
  console.error(err.error?.flatten());
  const firstIssue = err.error?.issues[0];
  if (
    firstIssue?.code === ZodIssueCode.invalid_type
    || firstIssue?.code === ZodIssueCode.too_small
    || firstIssue?.code === ZodIssueCode.too_big
  ) {
    return res.status(StatusCodes.badRequest)
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
  return res.status(StatusCodes.internal)
    .json({ error: 'Something went wrong...' });
};

export default {
  handleDomainError,
  handleZodDomainError,
};
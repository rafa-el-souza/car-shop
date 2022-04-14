import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodObject, ZodRawShape } from 'zod';

import { Service as GenericService } from '../services';

export abstract class Controller<T> {
  abstract route: string;

  constructor(
    protected service: GenericService<T>,
    protected schema: ZodObject<ZodRawShape>,
  ) {}

  validateBody = (
    req: Request<T>,
    res: Response<T>,
    next: NextFunction,
  ): void => {
    const { body } = req;
    try {
      this.schema.parse(body);
    } catch (error) {
      return next({ error });
    }
    return next();
  };

  validateId = (
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        code: 400, message: 'Id must have 24 hexadecimal characters',
      });
    }
    return next();
  };

  create = (
    req: Request<T>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { body } = req;
    return this.service.create(body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next({ error }));
  };

  read = (
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,
  ): Promise<typeof res | void> => this.service.read()
    .then((result) => res.status(200).json(result))
    .catch((error) => next({ error }));

  readOne = (
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.readOne(id)
      .then((result) => {
        if (!result) return next({ code: 404, message: 'Object not found' });
        return res.status(200).json(result);
      })
      .catch((error) => next({ error }));
  };

  abstract update(
    req: Request<{ id: string; }, unknown, T>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void>;
}
export default Controller;

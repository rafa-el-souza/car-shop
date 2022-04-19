import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodObject, ZodRawShape } from 'zod';

import { Service as GenericService } from '../services';
import { ErrorMessage as m } from '../errors';
import { StatusCodes as c } from '../interfaces';

export abstract class Controller<T> {
  abstract route: string;

  constructor(
    protected service: GenericService<T>,
    public schema: ZodObject<ZodRawShape>,
  ) {}

  validateBody = (
    req: Request<{ id: string; }>,
    _res: Response<T>,
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
    _res: Response<T>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        code: c.badRequest, message: m.invalidId,
      });
    }
    return next();
  };

  create = (
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { body } = req;
    return this.service.create(body)
      .then((result) => res.status(c.created).json(result))
      .catch((error) => next({ error }));
  };

  read = (
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,
  ): Promise<typeof res | void> => this.service.read()
    .then((result) => res.status(c.ok).json(result))
    .catch((error) => next({ error }));

  readOne = (
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.readOne(id)
      .then((result) => {
        if (!result) return next({ code: c.notFound, message: m.notFound });
        return res.status(c.ok).json(result);
      })
      .catch((error) => next({ error }));
  };

  update = (
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    const { body } = req;
    return this.service.update(id, body)
      .then((result) => {
        if (!result) return next({ code: c.notFound, message: m.notFound });
        return res.status(c.ok).json(result);
      })
      .catch((error) => next({ error }));
  };

  delete = (
    req: Request<{ id: string; }>,
    res: Response<Record<string, never>>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.delete(id)
      .then((result) => {
        if (!result) return next({ code: c.notFound, message: m.notFound });
        return res.status(c.noContent).json({});
      })
      .catch((error) => next({ error }));
  };
}
export default Controller;

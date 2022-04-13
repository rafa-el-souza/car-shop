import { NextFunction, Request, Response } from 'express';

import { Service as GenericService } from '../services';

export abstract class Controller<T> {
  abstract route: string;

  constructor(
    protected service: GenericService<T>,
  ) {}

  abstract create(
    req: Request<T>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void>;

  read = (
    _req: Request,
    res: Response<T[]>,
    next: NextFunction,
  ): Promise<typeof res | void> => this.service.read()
    .then((result) => res.status(200).json(result))
    .catch((err) => next({ code: 500, error: err }));

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T>,
    next: NextFunction,
  ): Promise<typeof res | void>;

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

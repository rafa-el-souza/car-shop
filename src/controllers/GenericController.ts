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
  ): Promise<typeof res>;

  read = (
    _req: Request,
    res: Response<T[] | void>,
    next: NextFunction,
  ): Promise<typeof res | void> => this.service.read()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.error(err);
      next({ error: 'Something went wrong...' });
    });

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T>
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string; }, unknown, T>,
    res: Response<T>
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T>
  ): Promise<typeof res>;
}
export default Controller;

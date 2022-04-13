import { NextFunction, Request, Response } from 'express';

import { Controller as GenericController } from './GenericController';

import { CarService } from '../services';

import { Car } from '../interfaces';

export class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: Request<Car>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { body } = req;
    return this.service.create(body)
      .then((result) => res.status(201).json(result))
      .catch((err) => next({ code: 500, error: err }));
  };

  readOne = (
    req: Request<{ id: string; }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.readOne(id)
      .then((result) => {
        if (!result) return next({ code: 500 });
        return res.status(201).json(result);
      })
      .catch((err) => next({ code: 500, error: err }));
  };

  update = (
    req: Request<{ id: string; }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    const { body } = req;
    return this.service.update(id, body)
      .then((result) => {
        if (!result) return next({ code: 500 });
        return res.status(201).json(result);
      })
      .catch((err) => next({ code: 500, error: err }));
  };

  delete = (
    req: Request<{ id: string; }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.delete(id)
      .then((result) => {
        if (!result) return next({ code: 500 });
        return res.status(201).json(result);
      })
      .catch((err) => next({ code: 500, error: err }));
  };
}

export default CarController;

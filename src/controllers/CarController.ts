import { NextFunction, Request, Response } from 'express';

import { Controller as GenericController } from './GenericController';

import { CarService } from '../services';

import { carSchema } from '../validations';

import { Car } from '../interfaces';

export class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
    schema = carSchema,
  ) {
    super(service, schema);
    this._route = route;
  }

  get route() { return this._route; }

  update = (
    req: Request<{ id: string; }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    const { body } = req;
    return this.service.update(id, body)
      .then((result) => {
        if (!result) return next({ code: 404, message: 'Object not found' });
        return res.status(200).json(result);
      })
      .catch((error) => next({ error }));
  };

  delete = (
    req: Request<{ id: string; }>,
    res: Response<Car>,
    next: NextFunction,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    return this.service.delete(id)
      .then((result) => {
        if (!result) return next({ code: 404, message: 'Object not found' });
        return res.status(200).json(result);
      })
      .catch((error) => next({ error }));
  };
}

export default CarController;

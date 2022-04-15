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
}

export default CarController;

import { Controller as GenericController } from './GenericController';

import { MotorcycleService } from '../services';

import { motorcycleSchema } from '../helpers/validations';

import { Motorcycle } from '../helpers/interfaces';

export class MotorcycleController extends GenericController<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
    schema = motorcycleSchema,
  ) {
    super(service, schema);
    this._route = route;
  }

  get route() { return this._route; }
}

export default MotorcycleController;

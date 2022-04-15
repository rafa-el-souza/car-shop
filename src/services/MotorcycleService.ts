import GenericService from './GenericService';

import { MotorcycleModel } from '../models';

import { Motorcycle } from '../interfaces';

export class MotorcycleService extends GenericService<Motorcycle> {
  constructor(
    model = new MotorcycleModel(),
  ) {
    super(model);
  }
}

export default MotorcycleService;
import GenericService from './GenericService';

import { MotorcycleModel } from '../models';

import { Motorcycle } from '../helpers/interfaces';

export class MotorcycleService extends GenericService<Motorcycle> {
  constructor(
    model = new MotorcycleModel(),
  ) {
    super(model);
  }
}

export default MotorcycleService;
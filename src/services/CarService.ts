import GenericService from './GenericService';

import { CarModel } from '../models';

import { Car } from '../interfaces';

export class CarService extends GenericService<Car> {
  constructor(
    model = new CarModel(),
  ) {
    super(model);
  }
}

export default CarService;
import { CarController, MotorcycleController } from '../../app/controllers';
import { CustomRouter } from '../routers';
import { Car, Motorcycle } from '../../app/helpers/interfaces';

export const CarFactory = () => new CustomRouter<Car>(new CarController());

export const MotorcycleFactory = () => new CustomRouter<Motorcycle>(
  new MotorcycleController(),
);

export default {
  CarFactory,
  MotorcycleFactory,
};
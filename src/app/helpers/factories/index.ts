import { CarController, MotorcycleController } from '../../controllers';
import { CustomRouter } from '../../../api/routers';
import { Car, Motorcycle } from '../interfaces';

export const CarFactory = () => new CustomRouter<Car>(new CarController());

export const MotorcycleFactory = () => new CustomRouter<Motorcycle>(
  new MotorcycleController(),
);

export default {
  CarFactory,
  MotorcycleFactory,
};
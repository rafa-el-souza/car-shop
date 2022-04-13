import { CarController } from '../controllers';
import { CustomRouter } from '../routers';
import { Car } from '../interfaces';

export const CarFactory = () => new CustomRouter<Car>(new CarController());

export default {
  CarFactory,
};
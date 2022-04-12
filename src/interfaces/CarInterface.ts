import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number; // >= 2 && <= 4
  seatsQty: number; // >= 2 && <= 7
}
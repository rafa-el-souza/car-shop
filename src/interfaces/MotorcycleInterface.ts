import { Vehicle } from './VehicleInterface';

export interface Motorcycle extends Vehicle {
  category: 'Street' | 'Custom' | 'Trail';
  engineCapacity: number;
}
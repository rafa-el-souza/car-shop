import { Schema, model as createModel, Document } from 'mongoose';

import { Model as GenericModel } from './GenericModel';
import { Car as CarType } from '../validations';

export interface CarDocument extends CarType, Document { }

export const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export class CarModel extends GenericModel<CarType> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}

export default CarModel;
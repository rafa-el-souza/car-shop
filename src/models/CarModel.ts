import { Schema, model as createModel, Document } from 'mongoose';

import { Model as GenericModel } from './GenericModel';
import { Car as CarType } from '../validations';

export interface CarDocument extends CarType, Document { }

export const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export class CarModel extends GenericModel<CarType> {
  constructor(
    model = createModel('Car', carSchema),
  ) {
    super(model);
  }
}

export default CarModel;
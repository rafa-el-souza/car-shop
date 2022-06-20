import { Schema, model as createModel, Document } from 'mongoose';

import { Model as GenericModel } from './GenericModel';
import { Motorcycle as MotorcycleType } from '../helpers/validations';

export interface MotorcycleDocument extends MotorcycleType, Document { }

export const motorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export class MotorcycleModel extends GenericModel<MotorcycleType> {
  constructor(
    model = createModel('Motorcycle', motorcycleSchema),
  ) {
    super(model);
  }
}

export default MotorcycleModel;
import { z } from 'zod';
import { vehicleSchema } from './VehicleSchema';

const carSchema = vehicleSchema.extend({
  doorsQty: z
    .number({
      required_error: 'doorsQty is required',
      invalid_type_error: 'doorsQty must be a number',
    })
    .gte(2)
    .lte(4),
  seatsQty: z
    .number({
      required_error: 'seatsQty is required',
      invalid_type_error: 'seatsQty must be a number',
    })
    .gte(2)
    .lte(7),
});

export type Car = z.infer<typeof carSchema>;
export { carSchema };
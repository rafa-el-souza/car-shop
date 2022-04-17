import { z } from 'zod';
import { vehicleSchema } from './VehicleSchema';

const motorcycleSchema = vehicleSchema.extend({
  category: z
    .enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number({
      required_error: 'Engine Capacity is required',
      invalid_type_error: 'Engine Capacity must be a number',
    })
    .int({ message: 'Engine Capacity must be an integer' })
    .positive({ message: 'Engine Capacity must be positive' })
    .gte(50, {
      message: 'Engine Capacity must be greater than or equal to 50',
    })
    .lte(2500, {
      message: 'Engine Capacity must be less than or equal to 2500',
    }),
});

export type Motorcycle = z.infer<typeof motorcycleSchema>;
export { motorcycleSchema };

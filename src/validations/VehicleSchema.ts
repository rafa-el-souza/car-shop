import { z } from 'zod';

export const vehicleSchema = z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .gte(1900, { message: 'Year must be greater than or equal to 1900' })
    .lte(2022, { message: 'Year must be less than or equal to 2022' }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a boolean',
  }),
  buyValue: z
    .number({
      required_error: 'buyValue is required',
      invalid_type_error: 'buyValue must be a number',
    }),
});

export default vehicleSchema;
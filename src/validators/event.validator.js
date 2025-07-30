import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  dateTime: z
    .string()
    .min(1, 'Date and time are required')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  location: z.string().min(1, 'Location is required'),
  capacity: z
    .number({ invalid_type_error: 'Capacity must be a number' })
    .int('Capacity must be an integer')
    .positive('Capacity must be greater than 0')
    .max(1000, 'Capacity cannot exceed 1000'),
});

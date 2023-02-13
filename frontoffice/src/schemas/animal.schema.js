import { z } from 'zod';

export const AnimalSchema = z.object({
  name: z.string().min(1),
});

import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1).max(128),
  email: z.string().email(),
  password: z.string().min(8).max(64),
  gender: z.nullable(z.enum(['MALE', 'FEMALE', 'OTHER'])),
  dateOfBirth: z.nullable(z.date()),
});

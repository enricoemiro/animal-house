import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().min(1).max(280),
  category: z.nullable(z.enum(['HERE_IT_IS', 'HELP_ME', 'LOOKING_FOR_PARTNER'])),
});

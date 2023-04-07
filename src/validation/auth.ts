import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema.extend({
  name: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;

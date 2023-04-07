import bcrypt from 'bcrypt';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { registerSchema } from '@/validation/auth';

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const exists = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (exists)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await ctx.prisma.user.create({
        data: { name, email, hashedPassword },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        user,
      };
    }),
});

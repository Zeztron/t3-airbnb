import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

const reservationSchema = z.object({});

export const reservationsRouter = createTRPCRouter({
  reserve: protectedProcedure
    .input(reservationSchema)
    .mutation(({ input }) => {}),
});

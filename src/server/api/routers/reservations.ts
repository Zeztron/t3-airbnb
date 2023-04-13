import { createTRPCRouter, protectedProcedure } from '../trpc';
import {
  reservationSchema,
  getReservationsSchema,
  cancelReservationSchema,
} from '@/validation/reservation';

export const reservationsRouter = createTRPCRouter({
  reserve: protectedProcedure
    .input(reservationSchema)
    .mutation(async ({ ctx, input }) => {
      const { startDate, endDate, listingId, totalPrice } = input;
      const listingAndReservation = await ctx.prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          reservations: {
            create: {
              userId: ctx.session.user.id,
              startDate: startDate,
              endDate: endDate,
              totalPrice: totalPrice,
            },
          },
        },
      });

      return {
        status: 200,
        message: 'Reservation created successfully',
        listingAndReservation,
      };
    }),
  getReservations: protectedProcedure
    .input(getReservationsSchema)
    .query(async ({ ctx, input }) => {
      const { listingId, userId, authorId } = input;

      const query: any = {};

      if (input.listingId) {
        query.listingId = listingId;
      }

      if (input.userId) {
        query.userId = userId;
      }

      if (input.authorId) {
        query.listing = { userId: authorId };
      }

      const reservations = await ctx.prisma.reservation.findMany({
        where: query,
        include: {
          listing: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        status: 200,
        message: 'Reservations fetched successfully',
        reservations,
      };
    }),
  cancelReservation: protectedProcedure
    .input(cancelReservationSchema)
    .mutation(async ({ ctx, input }) => {
      const { reservationId } = input;

      const reservation = await ctx.prisma.reservation.deleteMany({
        where: {
          id: reservationId,
          OR: [
            { userId: ctx.session.user.id },
            { listing: { userId: ctx.session.user.id } },
          ],
        },
      });

      return {
        status: 200,
        message: 'Reservation cancelled successfully',
        reservation,
      };
    }),
});

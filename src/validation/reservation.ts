import z from 'zod';

export const reservationSchema = z.object({
  listingId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.number(),
});

export const getReservationsSchema = z.object({
  listingId: z.string().optional(),
  userId: z.string().optional(),
  authorId: z.string().optional(),
});

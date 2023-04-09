import { createTRPCRouter, protectedProcedure } from '../trpc';
import { listingSchema } from '@/validation/listing';

export const listingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(listingSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        category,
        title,
        description,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
      } = input;

      const listing = await ctx.prisma.listing.create({
        data: {
          category,
          title,
          description,
          guestCount,
          roomCount,
          bathroomCount,
          imageSrc,
          locationValue: input.location.value,
          price,
          userId: ctx.session.user.id,
        },
      });

      return {
        status: 201,
        message: 'Listing created successfully',
        listing,
      };
    }),
});

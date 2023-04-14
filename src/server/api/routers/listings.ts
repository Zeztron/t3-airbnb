import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { listingSchema, getListingSchema } from '@/validation/listing';
import { z } from 'zod';

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
  delete: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      // Remove listing from user's favorites if it exists
      if (user?.favoriteIds.includes(input.listingId)) {
        const favoriteIds = user.favoriteIds.filter(
          (favoriteId) => favoriteId !== input.listingId
        );
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: { favoriteIds },
        });
      }

      const listing = await ctx.prisma.listing.deleteMany({
        where: {
          id: input.listingId,
          userId: user?.id,
        },
      });

      return {
        status: 200,
        message: 'Listing deleted successfully',
        listing,
      };
    }),
  getAll: publicProcedure
    .input(getListingSchema)
    .query(async ({ ctx, input }) => {
      let query: any = {};

      if (input?.userId) {
        query.userId = input.userId;
      }

      if (input?.category) {
        query.category = input.category;
      }

      if (input?.roomCount) {
        query.roomCount = {
          gte: +input.roomCount,
        };
      }

      if (input?.guestCount) {
        query.guestCount = {
          gte: +input.guestCount,
        };
      }

      if (input?.bathroomCount) {
        query.bathroomCount = {
          gte: +input.bathroomCount,
        };
      }

      if (input?.locationValue) {
        query.locationValue = input.locationValue;
      }

      if (input?.startDate && input?.endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: input.startDate },
                  startDate: { lte: input.startDate },
                },
                {
                  startDate: { lte: input.endDate },
                  endDate: { gte: input.endDate },
                },
              ],
            },
          },
        };
      }

      console.log('query', query);

      const listings = await ctx.prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        status: 200,
        message: 'Listings fetched successfully',
        listings,
      };
    }),
  getById: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ ctx, input }) => {
      const listing = await ctx.prisma.listing.findUnique({
        where: {
          id: input.listingId,
        },
        include: { user: true },
      });

      if (!listing) return null;

      return {
        listing,
      };
    }),
});

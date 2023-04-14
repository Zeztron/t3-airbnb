import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const favoritesRouter = createTRPCRouter({
  favorite: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        favoriteIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newFavoriteIds = [...input.favoriteIds, input.listingId];

      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteIds: newFavoriteIds,
        },
      });

      return {
        status: 200,
        message: 'Listing added to favorites',
        user,
      };
    }),

  deleteFavorite: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        favoriteIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const filteredFavoriteIds = input.favoriteIds.filter(
        (id) => id !== input.listingId
      );

      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteIds: filteredFavoriteIds,
        },
      });

      return {
        status: 200,
        message: 'Listing removed from favorites',
        user,
      };
    }),

  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    const favorites = await ctx.prisma.listing.findMany({
      where: {
        id: {
          in: [...(user?.favoriteIds || [])],
        },
      },
    });

    return {
      status: 200,
      message: 'Favorites retrieved',
      favorites,
    };
  }),
});

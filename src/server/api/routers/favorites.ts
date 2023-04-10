import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
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
      console.log(input.favoriteIds);

      const newFavoriteIds = [...input.favoriteIds, input.listingId];

      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          favoriteIds: newFavoriteIds,
        },
      });

      console.log('favorite', user);

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
});

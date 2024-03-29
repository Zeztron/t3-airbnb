import { createTRPCRouter } from '@/server/api/trpc';
import {
  registerRouter,
  userRouter,
  listingsRouter,
  favoritesRouter,
  reservationsRouter,
} from '@/server/api/routers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: registerRouter,
  user: userRouter,
  listing: listingsRouter,
  favorites: favoritesRouter,
  reservations: reservationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

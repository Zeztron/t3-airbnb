import z from 'zod';

export const listingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  imageSrc: z.string().min(1, { message: 'Must include at least 1 image' }),
  location: z.object({
    flag: z.string(),
    label: z.string(),
    latlng: z.array(z.number()),
    region: z.string(),
    value: z.string(),
  }),
  category: z.string().min(1),
  guestCount: z.number().min(1, { message: 'Must include at least 1 guest' }),
  roomCount: z.number().min(1, { message: 'Must include at least 1 room' }),
  bathroomCount: z
    .number()
    .min(1, { message: 'Must include at least 1 bathroom' }),
});

export type IListing = z.infer<typeof listingSchema>;

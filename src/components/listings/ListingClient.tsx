'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useMemo } from 'react';
import { categories, Container } from '@/components';
import { ListingHead, ListingInfo } from '@/components/listings';

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser: User | null | undefined;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <div className='pb-20 pt-28'>
      <Container>
        <div className='mx-auto max-w-screen-lg'>
          <div className='flex flex-col gap-6'>
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;

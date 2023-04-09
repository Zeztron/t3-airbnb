import { ClientOnly, EmptyState, Container } from '@/components';
import { ListingCard } from '@/components/listings';
import { api } from '@/utils/api';
import { Listing } from '@prisma/client';
import { useSession } from 'next-auth/react';

const Main = () => {
  const { data, isLoading } = api.listing.getAll.useQuery();
  const { data: user } = useSession()

  if (data?.listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <div className='pb-20 pt-28'>
      <Container>
        <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {data?.listings?.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} currentUser={user?.user}/>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Main;

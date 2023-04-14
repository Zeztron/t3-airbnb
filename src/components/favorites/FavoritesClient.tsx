import { Listing, User } from '@prisma/client';
import { Container, Heading } from '@/components';
import { ListingCard } from '../listings';

interface FavoritesClientProps {
  listings: Listing[] | undefined;
  currentUser: User;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div className='pb-20 pt-28'>
      <Container>
        <Heading
          title='Favorites'
          subtitle='List of places you have favorited!'
        />
        <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {listings?.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FavoritesClient;

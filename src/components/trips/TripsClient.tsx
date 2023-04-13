'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Listing, Reservation, User } from '@prisma/client';
import { Container, Heading } from '@/components';
import { ListingCard } from '../listings';
import { api } from '@/utils/api';
import { toast } from 'react-hot-toast';

interface TripsClientProps {
  reservations: (Reservation & { listing: Listing })[] | undefined;
  currentUser: User;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');
  const { mutateAsync } = api.reservations.cancelReservation.useMutation({
    onSuccess: () => {
      toast.success('Reservation Cancled!');
    },
    onError: () => {
      toast.error('Something went wrong!');
    },
  });

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      await mutateAsync({ reservationId: id });

      setDeletingId('');
      router.refresh();
    },
    [router]
  );

  return (
    <div className='pb-20 pt-28'>
      <Container>
        <Heading
          title='Trips'
          subtitle="Where you've been and where you're going"
        />
        <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {reservations?.map((reservation) => (
            <ListingCard
              key={reservation.id}
              reservation={reservation}
              listing={reservation.listing}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel='Cancel Reservation'
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TripsClient;

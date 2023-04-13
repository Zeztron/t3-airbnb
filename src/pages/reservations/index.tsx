import { ClientOnly, EmptyState } from '@/components';
import { ReservationsClient } from '@/components/reservations';
import { api } from '@/utils/api';

const ReservationsPage = () => {
  const { data: user } = api.user.getCurrentUser.useQuery();

  const { data } = api.reservations.getReservations.useQuery({
    authorId: user?.id,
  });

  if (data && data?.reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Bookings found'
          subtitle='Looks like there are no bookings for you yet.'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={data?.reservations}
        currentUser={user!}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;

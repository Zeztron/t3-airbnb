import { EmptyState, ClientOnly } from '@/components';
import { TripsClient } from '@/components/trips';
import { api } from '@/utils/api';

const Trips = () => {
  const { data: user } = api.user.getCurrentUser.useQuery();

  const { data } = api.reservations.getReservations.useQuery({
    userId: user?.id,
  });

  if (data && data?.reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No tips found'
          subtitle='Looks like you havent reserved any trips.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={data?.reservations} currentUser={user!} />
    </ClientOnly>
  );
};

export default Trips;

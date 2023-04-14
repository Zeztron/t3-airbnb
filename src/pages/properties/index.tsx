import { ClientOnly, EmptyState } from '@/components';
import { PropertiesClient } from '@/components/properties';
import { api } from '@/utils/api';

const PropertiesPage = () => {
  const { data: user } = api.user.getCurrentUser.useQuery();

  const { data } = api.listing.getAll.useQuery({
    userId: user?.id,
  });

  if (data && data?.listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have no properties'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient properties={data?.listings} currentUser={user!} />
    </ClientOnly>
  );
};

export default PropertiesPage;

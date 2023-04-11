'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { ClientOnly, EmptyState } from '@/components';
import { ListingClient } from '@/components/listings';

const ListingPage = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const { data } = api.listing.getById.useQuery({
    listingId: listingId as string,
  });

  const { data: currentUser } = api.user.getCurrentUser.useQuery();

  if (!data) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={data.listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;

'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { categories, Container } from '@/components';
import { ListingHead, ListingInfo, ListingReservation } from '@/components/listings';
import { useLoginModal } from '@/hooks';
import { useRouter } from 'next/navigation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser: User | null | undefined;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    /*axios.post('/api/reservations', {
      totalPrice.
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id,
    }).then(() => toast.success()).catch(() => toast.error)*/
    //setDateRange(initialDateRange)
    // redirect to /traps
    router.refresh();
  }, []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
              <div className='order-first mb-10 md:order-last md:col-span-3'>
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value: any) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;

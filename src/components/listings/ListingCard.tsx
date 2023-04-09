'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Listing, Reservation, User } from '@prisma/client';
import { useCountries } from '@/hooks';
import { Button, HeartButton } from '@/components';
import Image from 'next/image';

interface ListingCardProps {
  listing: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className='group col-span-1 cursor-pointer'
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className='flex w-full flex-col gap-2'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <Image
            fill
            alt='Listing'
            src={listing.imageSrc}
            className='h-full w-full object-cover transition group-hover:scale-110'
          />
          <div className='absolute right-3 top-3'>
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || listing.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>/ night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;

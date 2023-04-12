'use client';

import dynamic from 'next/dynamic';
import { useCountries } from '@/hooks';
import { User } from '@prisma/client';
import { IconType } from 'react-icons';
import { Avatar } from '@/components';
import { ListingCategory } from '@/components/listings';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface ListingInfoProps {
  user: User;
  category: { label: string; icon: IconType; description: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 text-xl font-semibold'>
          <div>Hosted by {user.name}</div>
          <Avatar profilePicture={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;

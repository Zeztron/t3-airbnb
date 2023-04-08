'use client';

import Image from 'next/image';

interface AvatarProps {
  profilePicture: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ profilePicture }) => {
  return (
    <Image
      className='rounded-full'
      height='30'
      width='30'
      alt='Avatar'
      src={profilePicture || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;

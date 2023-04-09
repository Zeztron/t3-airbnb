'use client';

import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = false;

  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80'
    >
      <AiOutlineHeart
        size={28}
        className='absolute -right-[2px] -top-[2px] fill-white'
      />
      <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`}/>
    </div>
  );
};

export default HeartButton;

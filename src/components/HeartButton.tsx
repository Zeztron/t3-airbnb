'use client';

import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/hooks';
import { toast } from 'react-hot-toast';
import { useCallback, useMemo } from 'react';
import { api } from '@/utils/api';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { User } from '@prisma/client';

interface HeartButtonProps {
  listingId: string;
  currentUser: User;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(
    () => currentUser?.favoriteIds?.includes(listingId),
    [currentUser, listingId]
  );

  const mutationOptions = {
    onSuccess: () => {
      if (hasFavorited) {
        toast.success('Removed from favorites');
      } else {
        toast.success('Added to favorites');
      }
    },
    onError: () => toast.error('Something went wrong'),
  };

  const { mutateAsync: favorite } =
    api.favorites.favorite.useMutation(mutationOptions);

  const { mutateAsync: deleteFavorite } =
    api.favorites.deleteFavorite.useMutation(mutationOptions);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();
      if (hasFavorited) {
        console.log(hasFavorited);
        await deleteFavorite({
          listingId,
          favoriteIds: currentUser.favoriteIds,
        });
      } else {
        await favorite({ listingId, favoriteIds: currentUser.favoriteIds });
      }
      router.refresh();
    },
    [hasFavorited, currentUser, loginModal, favorite, deleteFavorite, router]
  );
  return (
    <div
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80'
    >
      <AiOutlineHeart
        size={28}
        className='absolute -right-[2px] -top-[2px] fill-white'
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`}
      />
    </div>
  );
};

export default HeartButton;

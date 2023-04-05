'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${
        outline
          ? 'border-black bg-white text-black'
          : 'border-rose-500 bg-rose-500 text-white'
      } ${
        small
          ? 'border-[1px] py-1 text-sm font-light'
          : 'text-md border-2 py-3 font-semibold'
      }`}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};

export default Button;

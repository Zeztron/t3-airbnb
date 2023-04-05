'use client';

import React from 'react';
import { Logo, Search, UserMenu } from '@/components/navbar';
import { Container } from '@/components';

const Navbar = () => {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='border-b-[1px] py-4'>
        <Container>
          <div className='items-cetner flex flex-grow justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { Navbar } from '@/components/navbar';
import { LoginModal, RegisterModal, RentModal } from '@/components/modals';
import { ToasterProvider } from '@/providers';
import { ClientOnly } from '@/components';
import { api } from '@/utils/api';

import '@/styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar />
      </ClientOnly>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

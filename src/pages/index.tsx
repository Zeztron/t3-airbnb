import { type NextPage } from 'next';
import { Nunito } from 'next/font/google';
import Head from 'next/head';
import { Navbar } from '@/components/navbar';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from '@/utils/api';
import ClientOnly from '@/components/ClientOnly';

const font = Nunito({
  subsets: ['latin'],
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Airbnb Clone</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={font.className}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
      </main>
    </>
  );
};

export default Home;

/*const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <p className='text-center text-2xl text-white'>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};*/

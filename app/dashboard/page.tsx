"use client" 

import { type Metadata } from 'next';
// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';
// COMPONENTS
import AuthCheck from '@/components/AuthCheck';
import Avatar from '@/components/Avatar';
import { SignInButton } from '@/components/Buttons';

export const MetaData: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: 'Dashboard',
  description: 'Welcome to your dashboard, manage your account here'
}

export default function SignInPage(){
  // HOOKS
  const { user } = useAuthContext();

  return (
    <section className="grid place-items-center">
      <AuthCheck fallback={(
        <>
          <h1>You are not signed it ... this page means nothing to you</h1>
          <SignInButton />
        </>
      )}>
        <h1>Welcome to you dashboard, {user?.displayName}</h1>
        <Avatar
          src={user?.photoURL}
          width={100}
          height={100}
          altText={user?.displayName ?? 'John Doe'}
        />
      </AuthCheck>
    </section>
  );
}
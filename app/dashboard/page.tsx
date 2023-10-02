"use client" 

import { type Metadata } from 'next';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// COMPONENTS
import AuthCheck from '@/components/AuthCheck';
import Avatar from '@/components/Avatar';
import { SignInButton, SignOutButton } from '@/components/Buttons';

export const MetaData: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: 'Dashboard',
  description: 'Welcome to your dashboard, manage your account here'
}

export default function SignInPage(){
  // HOOKS
  const { user } = useAuthState();

  return (
    <section className="grid place-items-center gap-2">
      <AuthCheck fallback={(
        <>
          <h1>You are not signed it ... this page means nothing to you</h1>
          <SignInButton />
        </>
      )}>
        <Avatar
          src={'/${user?.photoURL}'}
          width={250}
          height={250}
          altText={user?.displayName ?? 'John Doe'}
        />
        <div className="flex flex-col justify-between items-start gap-2">
          <p className="text-2xl">UID: {user?.uid}</p>
          <p className="text-2xl">Pro Statur: coming soon...</p>
          <p className="text-2xl">Account Email: {user?.email}</p>
        </div>
        <SignOutButton />
      </AuthCheck>
    </section>
  );
}
"use client" 

// NEXT
import { type Metadata } from 'next';
import Link from 'next/link';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// COMPONENTS
import AuthCheck from '@/components/AuthCheck';
import Avatar from '@/components/Avatar';
import { buttonVariants, Button } from '@/components/ui/Button';
// UTILS
import { cn } from '@/utils/helpers';
import { useSignOut } from '@/hooks/useSignOut';

export const MetaData: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: 'Dashboard',
  description: 'Welcome to your dashboard, manage your account here'
}

export default function DashboardPage(){
  // HOOKS
  const { user } = useAuthState();
  const { signOut, isLoading } = useSignOut();

  return (
    <section className="grid place-items-center gap-2">
      <AuthCheck fallback={(
        <>
          <h1>You are not signed it ... this page means nothing to you</h1>
          <Link href="/signin" className={cn(buttonVariants({ variant: "primary" }))}>
            Sign In
          </Link>
        </>
      )}>
        <h1>Welcome to you dashboard, {user?.displayName}</h1>
        <Avatar
          src={'/${user?.photoURL}'}
          width={250}
          height={250}
          altText={user?.displayName ?? 'John Doe'}
        />
        <Button
          className={cn(buttonVariants({ variant: "primary" }))}
          onClick={signOut}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign Out'}
        </Button>
      </AuthCheck>
    </section>
  );
}
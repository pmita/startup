"use client" 

// NEXT
import { type Metadata } from 'next';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// COMPONENTS
import Avatar from '@/components/Avatar';
import { buttonVariants, Button } from '@/components/ui/Button';
// HOOKS
import { useSignOut } from '@/hooks/useSignOut';
// UTILS
import { cn, fetchFromApi } from '@/utils/helpers';
import { useCollection } from '@/hooks/useCollection';

export const MetaData: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: 'Dashboard',
  description: 'Welcome to your dashboard, manage your account here'
}

const LIMIT = 1;

export default function DashboardPage(){
  // HOOKS
  const { user } = useAuthState();
  const { signOut, isLoading } = useSignOut();
  const { documents: invoices, isLoading: loadingExample, error } = useCollection(
    `/users/${user?.uid}/invoices`,
    // ["paid", "==", true],
    // ['createdAt', 'desc'],
  )


  // const handleClick = async () => {
  //   // we can't have a body sent to our get request
  //   const body = { limit: LIMIT, _orderBy: ['createdAt', 'desc'] };
  //   const invoices = await fetchFromApi('/api/database/invoices', {
  //     method: 'GET',
  //     body,
  //     cache: 'no-cache'
  //   });
  // }

  return (
    <section className="grid place-items-center gap-2">
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
    </section>
  );
}
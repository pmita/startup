"use client" 

// NEXT
import { type Metadata } from 'next';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// COMPONENTS
import Header from '@/components/Header';
import Title, { titleVariants } from '@/components/ui/Title';
import { UpdatePassword } from '@/components/update-password';
import { UpdateAddress } from '@/components/update-address';
import { DeleteAccount } from '@/components/delete-account';
import { UpdateAvatar } from '@/components/update-avatar';
// HOOKS
import { useSignOut } from '@/hooks/useSignOut';
import { useCollection } from '@/hooks/useCollection';
// UTILS
import { cn, fetchFromApi } from '@/utils/helpers';

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
    <section className="flex flex-col justify-start items-stretch gap-5">
      {/* The following are server components and cannot be rendered here*/}
      {/* <Header
        className="flex flex-col justify-start items-start gap-6 pl-5"
        headerTitle={
          <Title 
            title="Account"
            className={cn(titleVariants({ 
              variant: "secondary", 
              size: "lg",
              className: "capitalize" 
            }))}
          />
        }
        headerDescription={
          <Description
            description="Manage your account settings"
            className={cn(descriptionVariants({
              variant: "secondary",
              size: "default"
            }))}
          />
        }
      /> */}
      <UpdateAvatar />

      <UpdatePassword />
      <UpdateAddress />
      <DeleteAccount />
    </section>
  );
}
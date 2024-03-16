// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import { UpdatePassword } from './_components/update-password';
import { UpdateAddress } from './_components/update-address';
import { DeleteAccount } from './_components/delete-account';
import { UpdateAvatar } from './_components/update-avatar';

export const MetaData: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: 'Dashboard',
  description: 'Welcome to your dashboard, manage your account here'
}

export default async function DashboardPage(){
  return (
    <section className="flex flex-col justify-start items-stretch gap-5">
      <UpdateAvatar />
      <UpdatePassword />
      <UpdateAddress />
      <DeleteAccount />
    </section>
  );
}
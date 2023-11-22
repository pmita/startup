// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import { UpgradeToProButton } from '@/components/Buttons';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage() {
  return (
    <>
      <section className="flex flex-col justify-start items-start gap-5 ">
        <h1>Subscription plan</h1>
        <h3>You are currently on the Free Plan</h3>
        <p>The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts</p>
        <UpgradeToProButton />
      </section>
    </>
  );
}
// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import ManageBilling from './ManageBilling';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage() {
  return (
    <>
      <section className="flex flex-col justify-start items-start gap-5 ">
        <h1>Subscription plan</h1>
        <ManageBilling />
      </section>
    </>
  );
}
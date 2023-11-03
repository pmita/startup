// NEXT
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage() {
  return (
    <h1>Welcome to BillingPage</h1>
  );
}
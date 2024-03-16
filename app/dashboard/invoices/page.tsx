export const dynamic = 'force-dynamic';

// NEXT
import { type Metadata } from 'next';
// DATA
import { getInvoices } from '@/data/auth';
// COMPONENTS
import Header from '@/components/Header';
import Title, { titleVariants } from '@/components/ui/Title';
import Description, { descriptionVariants } from '@/components/ui/Description';
import { InvoicesList } from './_components/invoices-lits';
// UTILS
import { cn } from '@/utils/helpers';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your profile settings here'
}

const LIMIT = 5;

export default async function InvoicesPage() {
  // SERVER LAND
  const invoices = await getInvoices(LIMIT);


  return (
    <>
      <section className="flex flex-col justify-start items-stretch gap-5 ">
        <Header
          className="flex flex-col justify-start items-start gap-6 pl-5"
          headerTitle={
            <Title
              title='Invoices'
              className={cn(titleVariants({
                variant: 'secondary',
                size: 'lg',
                className: 'capitalize'
              }))}
            />
          }
          headerDescription={
            <Description
              description='Manage your invoices'
              className={cn(descriptionVariants({
                variant: 'secondary',
                size: 'default'
              }))}
            />
          }
        />
        <Suspense fallback={<div>Loading...</div>}>
          <InvoicesList invoices={invoices} />
        </Suspense>
      </section>
    </>
  );
}
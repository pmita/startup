// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
import { ManageBilling } from './_components/manage-billing';
// UTILS
import { cn } from '@/utils/helpers';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your subscription and billing information here'
}

export default async function BillingPage() {
  return (
    <>
      <section className="flex flex-col justify-start items-stretch gap-5 ">
      <Header
            className="flex flex-col justify-start items-start gap-6 pl-5"
            headerTitle={
              <Title 
                title="Billing"
                className={cn(titleVariants({ 
                  variant: "secondary", 
                  size: "lg",
                  className: "capitalize" 
                }))}
              />
            }
            headerDescription={
              <Description
                description="Manage your billing detail"
                className={cn(descriptionVariants({
                  variant: "secondary",
                  size: "default"
                }))}
              />
            }
          />
        <ManageBilling />
      </section>
    </>
  );
}
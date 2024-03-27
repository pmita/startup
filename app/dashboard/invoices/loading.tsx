// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";  
// UTILS
import { cn } from '@/utils/helpers';

export default function InvoicesPageLoading() {
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
        <Card className="flex flex-col justify-center gap-5 p-6 items-start min-h-[150px]">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-5 w-1/5" />
        </Card>
      </section>
    </>
  );
}
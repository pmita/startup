// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title } from '@/components/ui/title';
import { Description } from "@/components/ui/description";
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// UTILS
import { cn } from '@/utils/helpers';

export default function BillingPageLoading() {
  return (
    <section className="flex flex-col justify-start items-stretch gap-5 ">
      <Header
          className="flex flex-col justify-start items-start gap-6 pl-5"
          headerTitle={
            <Title title="Billing" />
          }
          headerDescription={
            <Description description="Manage your billing detail" />
          }
        />
        <Card className="flex flex-col justify-center gap-5 p-6 items-start min-h-[150px]">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-2/5" />
        </Card>
    </section>
  );
}
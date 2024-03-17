// COMPONENTS
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default async function DashboardPageLoading(){
  return (
    <section className="flex flex-col justify-start items-stretch gap-5">
      <Card className="flex flex-col justify-center gap-5 p-6 items-center min-h-[150px]">
        <Skeleton className="h-[250px] w-[250px] rounded-full" />
        <Skeleton className="h-5 w-1/5" />
      </Card>
      <Card className="flex flex-col justify-center gap-5 p-6 items-start min-h-[150px]">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-2/5" />
      </Card>
      <Card className="flex flex-col justify-center gap-5 p-6 items-start min-h-[150px]">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-2/5" />
      </Card>
      <Card className="flex flex-col justify-center gap-5 p-6 items-start min-h-[150px]">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-2/5" />
      </Card>
    </section>
  );
}
// NEXT
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
// COMPONENTS
import { DashboardNavigation } from "./_components/dashboard-navigation";
import { AuthCheck } from "@/components/auth-check";
import { buttonVariants } from "@/components/ui/button";
// UTILS
import { cn } from "@/utils/helpers";
// CONFIG
import { dashboardConfig } from "@/config/dashboard";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // SERVER LAND
  const nextCookies = cookies();
  const authToken = nextCookies.get('__session');

  if (!authToken) {
    redirect('/signin');
  }

  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <AuthCheck fallback={(
        <>
          <p>Log in again</p>
          <Link
            href="/signin"
            className={cn(buttonVariants({ variant: "primary" }))}
          >
            Buy Now
          </Link>
        </>
      )}>
        <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full h-[auto] scroll-auto p-5">
          <DashboardNavigation items={dashboardConfig.sideNav} />
        </aside>
        <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
          {children}
        </section>

      </AuthCheck>
    </div>
  )
}
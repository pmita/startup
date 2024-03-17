// NEXT
import { redirect } from "next/navigation";
import Link from "next/link";
// COMPONENTS
import { DashboardNavigation } from "./_components/dashboard-navigation";
import { AuthCheck } from "@/components/auth-check";
import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from "@/components/ui/title";
// UTILS
import { cn } from "@/utils/helpers";
// CONFIG
import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/data/auth";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // SERVER LAND
  const user = await getCurrentUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <AuthCheck fallback={(
        <Header
          className="flex flex-col justify-start items-center gap-6 pl-5"
          headerTitle={
            <h4>Sign back in to Continue</h4>
          }
          headerDescription={
            <Link 
              className={buttonVariants({ variant: "primary" })}
              href="/signin"
            >
              Sign In
            </Link>
          }
        />
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
// NEXT
import { redirect } from "next/navigation";
import Link from "next/link";
// COMPONENTS
import { DashboardNavigation } from "./_components/dashboard-navigation";
import { AuthCheck } from "@/components/auth-check";
import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { AsideContainer, SectionContainer, WrapContainer } from "@/layouts/wrap-container";
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
    <WrapContainer className="w-full p-5 pb-0">
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
        <AsideContainer className="w-full h-[auto] scroll-auto p-5">
          <DashboardNavigation items={dashboardConfig.sideNav} />
        </AsideContainer>
        <SectionContainer className="p-5 w-full order-1 lg:order-2">
          {children}
        </SectionContainer>
      </AuthCheck>
    </WrapContainer>
  )
}
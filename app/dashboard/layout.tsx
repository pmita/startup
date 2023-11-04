"use client"

// COMPONENTS
import DashboardList from "@/components/DashboardList";
// CONFIG
import { dashboardConfig } from "@/config/dashboard";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full h-[auto] scroll-auto p-5">
        <DashboardList items={dashboardConfig.sideNav} />
      </aside>
      <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </div>
  )
}
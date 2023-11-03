"use client"

// NEXT
import Link from "next/link"
import { usePathname } from "next/navigation"
// UTILS
import { cn } from "@/utils/helpers";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full order-2 lg:order-1 min-h-[90vh] scroll-auto p-5">
        <div className="flex flex-col justify-start items-start gap-2 bg-red-400">
          <Link 
            href="/dashboard/account" 
            className={cn(
              "font-poppins font-bold text-primary-black",
              pathname === '/dashboard/account' && 'text-opacity-50'
            )}
          >
            Account
          </Link>
          <Link 
            href="/dashboard/billing" 
            className={cn(
              "font-poppins font-bold text-primary-black",
              pathname === '/dashboard/billing' && 'text-opacity-50'
            )}
          >
            Billing
          </Link>
          <Link 
            href="/dashboard/settings" 
            className={cn(
              "font-poppins font-bold text-primary-black",
              pathname === '/dashboard/settings' && 'text-opacity-50'
            )}
          >
            Settings
          </Link>
        </div>
      </aside>
      <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </div>
  )
}
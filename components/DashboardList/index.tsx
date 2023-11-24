"use client"

// NEXT
import Link from "next/link"
import { usePathname } from "next/navigation"
// UTILS
import { cn } from "@/utils/helpers/client"
// TYPES
import type { NavItem } from "@/types"

export default function DashboardList({ items }: { items: NavItem[] }) {
  // HOOKS
  const pathname = usePathname();

  if(!items) return null;
  
  return (
    <nav className="flex flex-col justify-start items-start gap-2">
      {items.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className={cn(
            "font-poppins font-bold text-primary-black",
            (pathname === item.href) &&  'text-opacity-50',
            item.disabled && 'cursor-not-allowed text-opacity-25'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
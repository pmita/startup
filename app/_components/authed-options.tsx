"use client"

// NEXT
import Link from "next/link";
//COMPONENTS
import { buttonVariants } from "@/components/ui/button";
//HOOKS
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
import { useAuthState } from "@/hooks/useAuthState";
//UTILS
import { cn } from "@/utils/helpers";

export function ShouldShowProLink() {
  // HOOKS
  const isUserPro = useIsSubscriptionValid();

  return (
    <>
      {!isUserPro 
        ? (
          <li className="hover:scale-105 hover:opacity-75 font-semibold">
            <Link href={"/pro"}>
              Pro
            </Link>
          </li>
        )
        : null
      }
    </>
  )
}


export function ShouldShowDashboardLink() {
  const { user } = useAuthState();

  return (
  <>
    {user 
      ? (
        <Link href="/dashboard" className="hover:scale-105 hover:opacity-75 font-semibold text-primary">
          Dashboard
        </Link>
      )
      : (
        <Link
          href="/signin"
          className={cn(buttonVariants({ variant: "primaryOutlined" }))}
        >
          Sign In
        </Link>
      )
    }
  </>
  )
}
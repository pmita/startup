"use client"

// NEXT
import Link from "next/link";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";

export function NavbarAuthedOptions() {
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
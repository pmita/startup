"use client"

// NEXT
import Link from "next/link";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// COMPONENTS
import Avatar from "../../../components/avatar";
import { buttonVariants } from "../../../components/ui/button";
// UTILS
import { cn } from "@/utils/helpers";

export function NavbarAvatar() {
  const { user } = useAuthState();

  return (
  <>
    {user 
      ? (
        <Link href="/dashboard">
          <Avatar 
            src={'/${user?.photoURL}'} 
            width={40} 
            height={40} 
            altText="John Doe" 
          />
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
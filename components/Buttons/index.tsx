"use client"

// NEXT
import { useRouter } from "next/navigation";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";
// UTILS
import { cn } from '@/utils/helpers';

export function SignInButton({ className }: { className?: string }) {
  const router = useRouter();
  return(
    <button 
      className={cn(
        "button",
        "primaryButton"
      )}
      onClick={() => router.push('/signin')}
    >
      Sign In
  </button>
  )
}

export function SignOutButton() {
  const { signOut, isLoading } = useSignOut();

  return (
    <>
      {isLoading
        ? (
          <button className={cn("button", "secondaryButton")} onClick={() => signOut()}>
            Loading ...
          </button>
        )
        : (
          <button className={cn("button", "secondaryButton")} onClick={() => signOut()}>
            Sign Out
          </button>
        )
      }
    </>
  )
}
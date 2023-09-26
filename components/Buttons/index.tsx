"use client"

import Link from "next/link";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";

export function SignInButton() {
  return(
    <button className="primary-button">
      <Link href={'/signin'}>
        Sign In
      </Link>
  </button>
  )
}

export function SignOutButton() {
  const { signOut, isLoading } = useSignOut();

  return (
    <>
      {isLoading
        ? (
          <button className="primary-button" onClick={() => signOut()}>
            Loading ...
          </button>
        )
        : (
          <button className="primary-button" onClick={() => signOut()}>
            Sign Out
          </button>
        )
      }
    </>
  )
}
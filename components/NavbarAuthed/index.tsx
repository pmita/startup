"use client"

import Link from "next/link";
// HOOKS
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSignOut } from "@/hooks/useSignOut";

export default function NavbarAuthed() {
  // HOOKS
  const { user } = useAuthContext();
  const { signOut, isLoading, error } = useSignOut();

  return (
    <>
    {user 
      ? (
        <button className="primary-button" onClick={() => signOut()}>
          Sign Out
        </button>
      )
      : (
        <button className="primary-button">
          <Link href={'/signin'}>
            Sign In
          </Link>
        </button>
      )
    }
    </>
  );
}
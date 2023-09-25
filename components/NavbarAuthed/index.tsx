"use client"

import Link from "next/link";
// HOOKS
import { useAuthContext } from "@/hooks/useAuthContext";

export default function NavbarAuthed() {
  // HOOKS
  const { user } = useAuthContext();

  return (
    <>
    {user 
      ? (
        <button className="primary-button">
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
"use client"

// NEXT
import Link from "next/link";
// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// TYPES
import { PRO_STATUS } from "@/types/index";

export default function UserNavProOption() {
  // HOOKS
  const { proStatus } = useAuthState();

  console.log(proStatus);


  // FUNCTIONS
  const renderContent = useCallback(() => {
    switch(proStatus) {
      case PRO_STATUS.LIFE_TIME:
      case PRO_STATUS.ACTIVE:
        return null;
      case PRO_STATUS.CANCELED:
      default:
        return (
          <li className="hover:scale-105 hover:opacity-75 font-semibold">
            <Link href={"/pro"}>
              Pro
            </Link>
          </li>
        )
    }
  }, [proStatus]);

  return (
    <>
      {renderContent()}
    </>
  )
}
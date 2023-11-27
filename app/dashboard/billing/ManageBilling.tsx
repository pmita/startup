"use client" 

// NEXT
import { useRouter } from "next/navigation";
// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// TYPES
import { PRO_STATUS } from "@/types/index";

export default function ManageBilling() {
  // STATE
  const { proStatus } = useAuthState();
  const router = useRouter();

  // FUNCTIONS
  const renderContent = useCallback(() => {
    if (proStatus === PRO_STATUS.LIFE_TIME) {
      return (
        <>
          <h3>You are currently on the Life Time Plan, enjoy this platform till the death of time</h3>
          <p>Manage your subscription and billing information here ... coming soon</p>
        </>
      )
    }
    if (proStatus === PRO_STATUS.PRO) {
      return (
        <>
          <h3>You are currently on the PRO Plan</h3>
          <p>Manage your subscription and billing information here ... coming soon</p>
        </>
      )
    }
    if (proStatus === PRO_STATUS.BASIC) {
      return (
        <>
          <h3>You are currently on the BASIC Plan</h3>
          <p>Upgrade your status today with PRO</p>
          <button className="button primaryButton" onClick={() => router.push('/pro')}>
            PRO
          </button>
        </>
      )
    }

    return null;
  }, [proStatus, router]);

  return (
    <>
      {renderContent()}
    </>
  )
}
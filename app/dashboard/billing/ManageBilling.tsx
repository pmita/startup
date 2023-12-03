"use client" 

// NEXT
import { useRouter } from "next/navigation";
// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// TYPES
import { PRO_STATUS } from "@/types/index";
import { ManageSubscriptionButton } from "@/components/Buttons";

export default function ManageBilling() {
  // STATE
  const { proStatus } = useAuthState();
  const router = useRouter();

  // FUNCTIONS
  const renderContent = useCallback(() => {
    switch(proStatus) {
      case PRO_STATUS.LIFE_TIME:
        return (
          <>
            <h3>You are currently on the Life Time Plan, enjoy this platform till the death of time</h3>
            <p>Manage your subscription and billing information here ... coming soon</p>
          </>
        )
      case PRO_STATUS.ACTIVE:
        return (
          <>
            <h3>You are currently on the PRO Plan</h3>
            <p>Manage your subscription and billing information here ... coming soon</p>
            <ManageSubscriptionButton />
          </>
        );
      case PRO_STATUS.CANCELLED:
      case PRO_STATUS.EXPIRING:
        return (
          <>
            <h3>We miss you</h3>
            <p>Check the latest course with full access to PRO</p>
            <button className="button primaryButton" onClick={() => router.push('/pro')}>
              PRO
            </button>
          </>
        )
      default:
        return (
          <>
            <h3>You are currently on the BASIC Plan</h3>
            <p>Upgrade your status today with PRO</p>
            <button className="button primaryButton" onClick={() => router.push('/pro')}>
              PRO
            </button>
          </>
        );
    }
  }, [proStatus, router]);

  return (
    <>
      {renderContent()}
    </>
  )
}
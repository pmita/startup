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
      case PRO_STATUS.CANCELED:
        return (
          <>
            <h3>We miss you</h3>
            <p>Check the latest course with full access to PRO</p>
            <button className="button primaryButton" onClick={() => router.push('/pro')}>
              PRO
            </button>
          </>
        )
      case PRO_STATUS.PAST_DUE:
        return (
          <>
            <h3>Your payment is not past due</h3>
            <p>Please update your payment menthod below</p>
            <ManageSubscriptionButton />
          </>
        )
      case PRO_STATUS.UNPAID:
        return (
          <>
            <h3>We have now canceled your subscription</h3>
            <p>We we unable to collect for your subscription plan. To re-subscribe check our plans</p>
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
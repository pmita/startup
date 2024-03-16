"use client" 

// NEXT
import Link from "next/link";
import { useRouter } from "next/navigation";
// REACT
import { useCallback } from "react";
// COMPONENTS
import { ManageSubscriptionButton } from "./manage-subscription-button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// TYPES
import { PRO_STATUS } from "@/types/index";
// UTILS
import { cn } from "@/utils/helpers";

export function ManageBilling() {
  // STATE
  const { proStatus } = useAuthState();
  const router = useRouter();

  // FUNCTIONS
  const renderTitle = () => {
    switch(proStatus) {
      case PRO_STATUS.LIFE_TIME:
        return "You are currently on the Life Time Plan, enjoy this platform till the death of time"
      case PRO_STATUS.ACTIVE:
        return "You are currently on the PRO Plan"
      case PRO_STATUS.CANCELED:
        return "We miss you"
      case PRO_STATUS.PAST_DUE:
        return "Your payment is now past due"
      case PRO_STATUS.UNPAID:
        return "Your payment is now past 7 days"
      default:
        return "You are currently on the BASIC Plan"
    }
  };

  const renderDescription = () => {
    switch(proStatus) {
      case PRO_STATUS.LIFE_TIME:
        case PRO_STATUS.ACTIVE:
        return "Manage your subscription and billing information here ... coming soon"
      case PRO_STATUS.CANCELED:
        return "Check the latest course with full access to PRO"
      case PRO_STATUS.PAST_DUE:
        return "Please update your payment menthod below"
      case PRO_STATUS.UNPAID:
        return "We will be cancelling your subscription soon. To avoid losing access please update your payment method below"
      default:
        return "Upgrade your status today with PRO"
    }
  };

  const renderCTA = useCallback(() => {
    switch(proStatus) {
      case PRO_STATUS.LIFE_TIME:
        case PRO_STATUS.ACTIVE:
        case PRO_STATUS.PAST_DUE:
        case PRO_STATUS.UNPAID:
        return <ManageSubscriptionButton />
      case PRO_STATUS.CANCELED:
      default:
        return (
          <Link 
            href="/pro"
            className={cn(buttonVariants({ variant: "primary" }))}
          >
            Get Pro
          </Link>
        )
    }
  }, [proStatus]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">{renderTitle()}</CardTitle>
          <CardDescription>
            {renderDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderCTA()}
        </CardContent>
      </Card>
    </>
  )
}
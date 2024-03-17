"use client"

// REACT
import { useCallback } from "react";
// COMPONENTS
import { ButtonProps, buttonVariants } from "../../../../components/ui/button";
// UTITLS
import { cn, fetchFromApi } from "@/utils/helpers";

export interface ManageSubscriptionButtonProps extends ButtonProps {}

export function ManageSubscriptionButton({ className, variant, ...props }: ManageSubscriptionButtonProps) {
  // Events
  const handleClick = useCallback(async () => {
    const session = await fetchFromApi('/api/stripe/portal', {
      method: 'POST',
    });

    if (session) {
      window.location.href = session.url;
    }
  }, []);

  return (
    <button 
      onClick={handleClick}
      className={cn(buttonVariants({ variant: "primary", className }))}
      {...props}
    >
      Manage Subscription
    </button>
  );
}
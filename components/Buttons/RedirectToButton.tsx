"use client"

// NEXT
import { useRouter } from "next/navigation";
// COMPONENTS
import { ButtonProps, buttonVariants } from "../ui/Button";
// UTILS
import { cn } from "@/utils/helpers";
import { useCallback } from "react";

export interface RedirectToButtonProps extends ButtonProps {
  redirectTo?: string;
  callToAction?: string;
}

export function RedirectToButton({ className, variant, redirectTo, callToAction, ...props }: RedirectToButtonProps) {
    // HOOKS
    const router = useRouter();

    // EVENTS
    const onClick = useCallback(() => {
      router.push(`${redirectTo}`)
    }, [redirectTo, router]);

    return(
      <button 
        className={cn(buttonVariants({ variant, className }))}
        onClick={onClick}
        {...props}
      >
        {callToAction ?? 'Check it out'}
    </button>
    )  }



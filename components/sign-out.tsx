"use client";

// REACT
import { Button, buttonVariants } from "./ui/button";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";
// UTILS
import { cn } from "@/utils/helpers";

export function SignOutButton() {
  // STATE & HOOKS
  const { signOut, isLoading } = useSignOut();
  
  return (
    <Button
      className={cn(buttonVariants({ variant: "primary" }))}
      onClick={signOut}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign Out'}
    </Button>
  )
}
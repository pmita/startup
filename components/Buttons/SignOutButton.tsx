"use client"

// COMPONENTS
import { ButtonProps, buttonVariants } from "../ui/Button";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";
// UTILS
import { cn } from "@/utils/helpers";

export interface SignOutButtonProps extends ButtonProps {}

export function SignOutButton({ className, variant, ...props }: SignOutButtonProps) {
  // HOOKS
  const { signOut, isLoading } = useSignOut();

  return(
    <button 
      className={cn(buttonVariants({ variant, className }))}
      onClick={signOut}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : 'Sign Out'}
  </button>
  );
}



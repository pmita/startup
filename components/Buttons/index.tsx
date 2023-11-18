"use client"

// NEXT
import { useRouter } from "next/navigation";
// REACT
import { useCallback} from "react";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";
// UTILS
import { cn, fetchFromApi } from '@/utils/helpers';

export function SignInButton({ className }: { className?: string }) {
  const router = useRouter();
  return(
    <button 
      className={cn(
        "button",
        "primaryButton",
        className
      )}
      onClick={() => router.push('/signin')}
    >
      Sign In
  </button>
  )
}

export function SignOutButton({ className }: { className?: string}) {
  const { signOut, isLoading } = useSignOut();

  return (      
    <button 
      className={cn("button", "secondaryButton", className)}
      onClick={signOut}
      disabled={isLoading}
    >
      {isLoading ? 'Loading ...' : 'Sign Out'}
    </button>
  )
}

export function UpgradeToProButton({ className }: { className?: string}) {
  const handleClick = useCallback(async () => {
    const session = await fetchFromApi('/api/stripe/checkout', {
      method: 'POST',
      body: {
        line_items: [
          {
            price: 'price_1OCT9XGIIdUaTAvR68bhsZMp',
            quantity: 1,
          }
        ]
      },
    });

    if (session) {
      window.location.href = session.url;
    }
  }, []);

  return (
    <button 
      className={cn(
        "button",
        "primaryButton",
        className 
      )}
      onClick={handleClick}
    >
      Upgrade to PRO
    </button>
  )
}
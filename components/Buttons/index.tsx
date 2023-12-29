"use client"

// NEXT
import { useRouter } from "next/navigation";
// REACT
import { useCallback, useState, useEffect } from "react";
// HOOKS
import { useSignOut } from "@/hooks/useSignOut";
// UTILS
import { cn, fetchFromApi } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
// TYPES
import Stripe from "stripe";
import { ProductPurchaseType} from "@/types/index";

export function GoToDashboardButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button 
      className={cn(
        "button",
        "primaryButton",
        className 
      )}
      onClick={() => router.push('/dashboard')}
    >
      Check my Dashboard
    </button>
  );
}

export function SignInButton({ 
  className,
  children
}: { 
  className?: string 
  children?: React.ReactNode
}) {
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
      {children ?? 'Sign In'}
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

export type CheckoutButtonProps = {
  className?: string;
  stripeProduct: Stripe.Checkout.SessionCreateParams.LineItem;
  purchaseType?: ProductPurchaseType;
  children: React.ReactNode;
}

export function CheckoutButton({ 
  className, 
  stripeProduct, 
  purchaseType = ProductPurchaseType.ONE_TIME,
  children 
}: CheckoutButtonProps) {
  // STATE
  const [product, setProduct] = useState({});

  // EFFECTS
  useEffect(() => {
    setProduct({
      quantity:  stripeProduct.quantity,
      price: stripeProduct.price
    })
  }, [stripeProduct.price, stripeProduct.quantity]);

  // EVENTS
  const handleClick = useCallback(async () => {
    const body = { type: purchaseType, line_items: [product]}
    const session = await fetchFromApi('/api/stripe/checkout', {
      method: 'POST',
      body
    });

    const stripe = await getStripe();
    if (session) {
      window.location.href = session.url;
      stripe?.redirectToCheckout({ sessionId: session.id });
    }
  }, [product, purchaseType]);

  return (
    <button 
      className={cn(
        "button",
        "primaryButton",
        className 
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export function ManageSubscriptionButton({ className }: { className?: string }) {
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
      className={cn(
        "button",
        "primaryButton",
        className 
      )}
      onClick={handleClick}
    >
      Manage Subscription
    </button>
  );
}
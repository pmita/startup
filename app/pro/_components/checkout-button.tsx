
"use client"

// REACT
import { useCallback, useState, useEffect } from "react";
// COMPONENTS
import { ButtonProps, buttonVariants } from "../../../components/ui/button";
// UTILS
import { cn, fetchFromApi } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
// TYPES
import Stripe from "stripe";
import { ProductPurchaseType} from "@/types/index";

export interface CheckoutButtonProps extends ButtonProps {
  stripeProduct: Stripe.Checkout.SessionCreateParams.LineItem;
  purchaseType?: ProductPurchaseType;
  callToAction?: string;
}

export function CheckoutButton({ 
  className, 
  stripeProduct, 
  purchaseType = ProductPurchaseType.ONE_TIME,
  callToAction = 'Buy Now',
  ...props
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
      className={cn(buttonVariants({ variant: "primary", className }))}
      onClick={handleClick}
      {...props}
    >
      {callToAction}
    </button>
  )
}
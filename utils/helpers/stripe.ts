// STRIPE
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";
// TYPES
import { ProductPurchaseType } from "@/types";

const PORTAL_RETURN_URL = "http://localhost:3000/dashboard"
const CHECKOUT_SUCCESS_URL = "http://localhost:3000/dashboard"
const CHECKOUT_CANCEL_URL = "http://localhost:3000/pro"

export async function createStripeCheckoutSession(
  customerId: string,
  user: { uid: string, email: string | undefined },
  type: ProductPurchaseType,
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
){
  let session;
  if (type === ProductPurchaseType.RECURRING) {
    session = await stripe.checkout.sessions.create({
      success_url: CHECKOUT_SUCCESS_URL,
      cancel_url: CHECKOUT_CANCEL_URL,
      payment_method_types: ['card'],
      customer: customerId,
      mode: 'subscription',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      line_items,
      metadata: {
        firebaseUID: user.uid
      }
    })
  } else if (type === ProductPurchaseType.ONE_TIME) {
    session = await stripe.checkout.sessions.create({
      success_url: CHECKOUT_SUCCESS_URL,
      cancel_url: CHECKOUT_CANCEL_URL,
      payment_method_types: ['card'], 
      customer: customerId,  
      mode: 'payment',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      line_items,
      metadata: {
        firebaseUID: user.uid
      }
    })
  }

  return session;
}

export async function createStripePortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: PORTAL_RETURN_URL
  });

  return session;
}
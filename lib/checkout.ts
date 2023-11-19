// STRIPE
import { stripe } from "@/utils/stripe";
// TYPES
import Stripe from "stripe";
import { ProductPurchaseType } from "@/types";

export async function createStripeCheckoutSession(
  user: { uid: string, email: string | undefined },
  type: ProductPurchaseType,
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
){
  let session;
  if (type === ProductPurchaseType.RECURRING) {
    session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/pro',
      cancel_url: 'http://localhost:3000/pro',
      payment_method_types: ['card'],
      customer_email: user.email,
      mode: 'subscription',
      billing_address_collection: 'required',
      line_items,
      metadata: {
        firebaseUID: user.uid
      }
    })
  } else if (type === ProductPurchaseType.ONE_TIME) {
    session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/pro',
      cancel_url: 'http://localhost:3000/pro',
      payment_method_types: ['card'],
      customer_email: user.email,     
      mode: 'payment',
      billing_address_collection: 'required',
      line_items,
      metadata: {
        firebaseUID: user.uid
      }
    })
  }

  return session;
}
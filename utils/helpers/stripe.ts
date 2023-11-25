// STRIPE
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";
// TYPES
import { ProductPurchaseType } from "@/types";

export async function createStripeCheckoutSession(
  customerId: string,
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
      success_url: 'http://localhost:3000/pro',
      cancel_url: 'http://localhost:3000/pro',
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
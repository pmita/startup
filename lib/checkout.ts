// STRIPE
import { stripe } from "./stripe";
import Stripe from "stripe";

export async function createStripeCheckoutSession(
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
){
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/dashboard/billing',
    cancel_url: 'http://localhost:3000/dashboard/billing',
    payment_method_types: ['card'],
    customer_email: 'panos@example.com',
    mode: "subscription",
    billing_address_collection: "auto",
    line_items
  });

  return session;
}
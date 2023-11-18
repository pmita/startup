// STRIPE
import { stripe } from '@/utils/stripe';
// TYPES
import Stripe from 'stripe';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || '';

export enum StripeWebhookEvents {
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
}

const relavantEvents = new Set([
  'product.created',
  'product.updated',
  'customer.subscription.created',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    if (!signature && !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch(error) {
    console.log(`❌ Error message: ${(error as Error).message}`);
    return new Response(`Webhook Error: ${(error as Error).message}`, { status: 400 });
  }

  if (relavantEvents.has(event.type)) {
    try {
      switch(event.type) {
        case StripeWebhookEvents.PRODUCT_CREATED:
        case StripeWebhookEvents.PRODUCT_UPDATED:
          console.log('hurray');
          break;
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED:
          console.log('default');
          await ManageSubscriptionStatus(event.data.object as Stripe.Subscription);
          break;
        default: 
          throw new Error('Unhandled relevant event');
      }
    } catch(error) {
      console.log(error);
      return new Response('Webhook handler failed. Please check your next.js function logos', {
        status: 400,
      })
    }
  }
}

export async function ManageSubscriptionStatus(data: Stripe.Subscription) {
  console.log(data.customer);
  console.log('hurray we got this event to fire through our webhooks')
}
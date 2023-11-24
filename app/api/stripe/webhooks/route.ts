// NEXT
import { headers } from 'next/headers';
// STRIPE
import { stripe } from '@/utils/stripe';
import Stripe from 'stripe';
// UTILS
import { updateProductOnFirestore, manageSubscriptionStatusChange, insertPriceRecord } from '@/utils/helpers-sever';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || '';

export enum StripeWebhookEvents {
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  PRICE_CREATED = 'price.created',
  PRICE_UPDATED = 'price.updated',
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
}

const relavantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
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
          await updateProductOnFirestore(event.data.object as Stripe.Product);
          break;
        case StripeWebhookEvents.PRICE_CREATED:
        case StripeWebhookEvents.PRICE_UPDATED:
          const price = event.data.object as Stripe.Price;
          await insertPriceRecord(price);
          break;
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_DELETED:
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id, 
            subscription.customer as string, 
            false
          );
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
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
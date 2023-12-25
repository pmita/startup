// NEXT
import { headers } from 'next/headers';
// STRIPE
import { stripe } from '@/utils/stripe';
import Stripe from 'stripe';
// UTILS
import {
   updateInvoices,
   manageProStatus
} from '@/lib/firestore';
// TYPES
import { StripeWebhookEvents, StripeWebhookSubscirptionEvents, StripeWebhookInvoiceEvents } from '@/types';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || '';

const relavantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'invoice.upcoming',
  'invoice.marked_uncollectible',
  'invoice.payment_action_required',
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
    console.log('------->' + event.type + 'just triggered');
    try {
      switch(event.type) {
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_CREATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
        case StripeWebhookEvents.CUSTOMER_SUBSCRIPTION_DELETED:
          const subscription = event.data.object as Stripe.Subscription;
          await manageProStatus(
            subscription.id,
            subscription.customer as string,
            event.type as StripeWebhookSubscirptionEvents
          )
          break;
        case StripeWebhookEvents.INVOICE_PAID:
        case StripeWebhookEvents.INVOICE_PAYMENT_SUCCEEDED:
        case StripeWebhookEvents.INVOICE_PAYMENT_FAILED:
        case StripeWebhookEvents.INVOICE_PAYMENT_ACTION_REQUIRED:
          const invoice = event.data.object as Stripe.Invoice;
          await updateInvoices(
            invoice, 
            event.type as StripeWebhookInvoiceEvents
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
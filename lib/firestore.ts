// FIREBASE ADMIN
import { firestore, fromMillis, arrayRemove, arrayUnion } from "../utils/firebase-admin";
// STRIPE
import { stripe } from "../utils/stripe";
// TYPES
import Stripe from "stripe";
import { StripeWebhookSubscirptionEvents } from "@/types";

export async function updateInvoice(invoice: Stripe.Invoice) {
  // extract user details
  const userRef = await firestore.collection('users').where('stripeCustomerId', '==', invoice.customer).get();
  const { uid: FirebaseUID } = userRef?.docs[0]?.data() ?? {};

  if (!FirebaseUID) throw new Error('No user found with this customer ID');

  // update invoice subcollection on firestore accordingly
  // this will trigger for invoices paid, payment failed, unpaid, and uncollectable
  const response = await userRef.docs[0].ref
    .collection('invoices')
    .doc(invoice.id)
    .set({
      id: invoice.id,
      amount_paid: invoice.amount_paid,
      createdAt: invoice.created
        ? fromMillis(invoice.created * 1000)
        : null,
      paid: invoice.paid,
      status: invoice.status,
    }, { merge: true });

  // handle success/error states
  if (!response) {
    throw new Error('Failed to update user invoices');
  } else {
    console.log(`Inserted/updated invoice id [${invoice.id}] for user ${FirebaseUID}`);
  }
}

export async function consoleStuff(itemsToConsoleLog: any) {
  console.log('Console Here ------->', itemsToConsoleLog);
}

export async function manageOneTimePurchase(checkout: Stripe.Checkout.Session) {
  // extract user details
  const userRef = await firestore.collection('users').where('stripeCustomerId', '==', checkout.customer).get();
  const { uid: FirebaseUID } = userRef?.docs[0]?.data() ?? {};

  if (!FirebaseUID) throw new Error('User not found');

  // extract product details from stripe
  const checkoutLineItemDetails = await stripe.checkout.sessions.listLineItems(checkout.id, {
    limit: 1,
  })
  const productDetailsFromStripe = await stripe.products.retrieve(checkoutLineItemDetails?.data[0]?.price?.product as string);

  // update user status on firestore
  const response = await userRef.docs[0].ref.update({
    isPro: productDetailsFromStripe.metadata.proStatus ? true : false,
    proStatus: productDetailsFromStripe.metadata.proStatus ?? 'basic',
    expires: null,
  });

  // handle success/error states
  if (!response) {
    throw new Error('Failed to update user status based on this stripe purchase');
  } else {
    console.log(`Updated user pro status for user ${FirebaseUID} based on stripe checkout id ${checkout.id}`);
  }
}

export async function manageSubscriptionPurchase(
  subscriptionId: string, 
  stripeCustomerId: string,
  eventType: StripeWebhookSubscirptionEvents
) {
  // extract user details
  const userRef = await firestore.collection('users').where('stripeCustomerId', '==', stripeCustomerId).get();
  const { uid: FirebaseUID} = userRef?.docs[0]?.data() ?? {};

  if (!FirebaseUID) throw new Error('User not found');

  // subscription details from stripe based on event's subscription id
  const subscriptionDetailsFromStripe = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  // update user status on firestore
  let response;
  switch(eventType) {
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
      response = await userRef.docs[0].ref.update({
        isPro: true,
        proStatus: subscriptionDetailsFromStripe.status,
        subscriptions: arrayUnion(subscriptionDetailsFromStripe.items.data[0].plan.id),
        expires: subscriptionDetailsFromStripe.current_period_end
        ? fromMillis(subscriptionDetailsFromStripe.current_period_end * 1000)
        : null,
      });
      break;
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
      response = await userRef.docs[0].ref.update({
        isPro: false,
        proStatus: subscriptionDetailsFromStripe.status,
        subscriptions: arrayRemove(subscriptionDetailsFromStripe.items.data[0].plan.id),
        expires: subscriptionDetailsFromStripe.cancel_at
          ? fromMillis(subscriptionDetailsFromStripe.cancel_at * 1000)
          : null,
      });
      break;
    default:
      break;
  }
  
  // handle success/error states
  if(!response) {
    throw new Error('Failed to update user pro status');
  } else {
    console.log('User pro status updated successfully');
  }
}
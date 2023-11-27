// FIREBASE
import { arrayUnion, arrayRemove, firestore, fromMillis } from '@/utils/firebase-admin';
// STRIPE
import { stripe } from '@/utils/stripe';
import { StripeWebhookSubscirptionEvents } from '@/types';

export async function manageProStatus(
  subscriptionId: string, 
  stripeCustomerId: string,
  eventType: StripeWebhookSubscirptionEvents
) {
  const userRef = await firestore.collection('users').where('stripeCustomerId', '==', stripeCustomerId).get();
  const { uid } = userRef?.docs[0]?.data() ?? {};

  if (!uid) throw new Error('User not found');

  const subscriptionDetailsFromStripe = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  let response;
  switch(eventType) {
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_CREATED:
      response = await userRef.docs[0].ref.update({
        isPro: true,
        proStatus: 'PRO',
        subscriptions: arrayUnion(subscriptionDetailsFromStripe.items.data[0].plan.id),
        expires: subscriptionDetailsFromStripe.cancel_at
          ? fromMillis(subscriptionDetailsFromStripe.cancel_at * 1000)
          : null,
      });
      break;
    case StripeWebhookSubscirptionEvents.CUSTOMER_SUBSCRIPTION_DELETED:
      response = await userRef.docs[0].ref.update({
        isPro: false,
        proStatu: 'BASIC',
        subscriptions: arrayRemove(subscriptionDetailsFromStripe.items.data[0].plan.id),
        expires: null,
      });
      break;
    default:
      break;
  }
  
  if(!response) {
    throw new Error('Failed to update user pro status');
  } else {
    console.log('User pro status updated successfully');
  }
}
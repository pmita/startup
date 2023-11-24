// FIREBASE ADMIN
import { firestore, fromMillis } from "../firebase-admin";
// STRIPE
import { stripe } from "../stripe";
import Stripe from "stripe";
// UTILS
import { getOrCreateCustomer } from "./auth";


export async function updateProduct(product: Stripe.Product) {
  // extract details from incoming product object and update firestore fields
  const { id, active, name, description, metadata } = product;
  const response = await firestore.collection('products').doc(id).set({
    id,
    active,
    name,
    description,
    image: product.images?.[0] ?? null,
    metadata
  }, { merge: true });

  // throw error if response is null
  if (!response) throw new Error('Failed to create product on firestore');

  // log success
  console.log(`Inserted/updated product [${id}]`)
}

export async function updateProductPrice(price: Stripe.Price) {
  // extract productStripeId and priceId from incoming event and update firestore fields
  const { product, id } = price;
  const response = await firestore
    .collection('products')
    .doc(product as string)
    .collection('prices')
    .doc(id)
    .set({
      id,
      firebaseUID: typeof price.product === 'string' ? price.product : '',
      active: price.active,
      billing_scheme: price.billing_scheme,
      currency: price.currency,
      description: price.nickname ?? null,
      type: price.type,
      unit_amount: price.unit_amount ?? 0,
      unit_amount_decimal: price.unit_amount_decimal ?? '0',
      interval: price.recurring?.interval ?? null,
      interval_count: price.recurring?.interval_count ?? null,
      metadata: price.metadata,
    }, { merge: true });

    // throw error if response is null
    if (!response) throw new Error('Failed to create price on firestore');

    // log success
    console.log(`Inserted/updated price [${id}] for product [${product}]`);
}

export async function copyBillingDetailsToCustomerDoc(
  firebaseUID: string,
  payment_method: Stripe.PaymentMethod
) {
  // extract customer details from stripe
  const stripeCustomerId = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;

  // if any of the following details are missing, throw an error
  if (!name || !phone || !address) return;

  // usince this is a new subscription, then save the billing details on user's stripe account
  await stripe.customers.update(stripeCustomerId, {
    name,
    phone,
    address: {
      line1: address?.line1 ?? '',
      line2: address?.line2 ?? '',
      city: address?.city ?? undefined,
      state: address?.state ?? '',
      postal_code: address?.postal_code ?? '',
      country: address?.country ?? ''
    }
  });

  // at last update the user's billing details on firestore
  const response = await firestore.collection('users').doc(firebaseUID).update({
    billing_address: {...address},
    payment_method: {...payment_method[payment_method.type]}
  });

  // throw error if response is null
  if (!response) throw new Error('Failed to update user billing details');
}

export async function manageSubscriptionStatusChange(subscriptionId: string, stripeId: string, isNewSubscription: boolean) {
  // finde corresponding user from firebase based on stripe customer ID
  const userDocument= await firestore.collection('users').where('stripeCustomerId', '==', stripeId).get();
  const { uid: firebaseUID } = userDocument.docs[0].data() ?? {};

  // if no user exist with this stripe customer ID, throw an error
  if (!firebaseUID) throw new Error('No user found with this customer ID');

  // check if user exist or not and get back the stripe details for the subscription that triggered this webhook
  const customerDetailsFromStripe = await getOrCreateCustomer(firebaseUID);
  const subscriptionDetailsFromStripe = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  // update user's subcollection of subscriptions under the unique customer ID
  const response = await firestore.collection('users').doc(firebaseUID).collection('subscriptions').doc(subscriptionId).set({
    id: subscriptionId,
    firebaseUID,
    metadata: subscriptionDetailsFromStripe.metadata,
    status: subscriptionDetailsFromStripe.status,
    price_id: subscriptionDetailsFromStripe.items.data[0].price.id,
    cancel_at_period_end: subscriptionDetailsFromStripe.cancel_at_period_end,
    cancel_at: subscriptionDetailsFromStripe.cancel_at
      ? fromMillis(subscriptionDetailsFromStripe.cancel_at)
      : null,
    canceled_At: subscriptionDetailsFromStripe.canceled_at
      ? fromMillis(subscriptionDetailsFromStripe.canceled_at)
      : null,
    currect_period_start: subscriptionDetailsFromStripe.current_period_start
      ? fromMillis(subscriptionDetailsFromStripe.current_period_start)
      : null,
    currect_period_end: subscriptionDetailsFromStripe.current_period_end
      ? fromMillis(subscriptionDetailsFromStripe.current_period_end)
      : null,
    created: subscriptionDetailsFromStripe.created
      ? fromMillis(subscriptionDetailsFromStripe.created)
      : null,
    ended_at: subscriptionDetailsFromStripe.ended_at 
      ? fromMillis(subscriptionDetailsFromStripe.ended_at)
      : null,
  }, { merge: true });

  // throw error if response is null
  if (!response) throw new Error('Failed to create subscription on firestore');

  console.log(`Inserted/updated subscription [${subscriptionId}] for user ${firebaseUID}`);

  // if this is a new subscription, copy billing details from stripe to user doc on firestore
  if (isNewSubscription && subscriptionDetailsFromStripe.default_payment_method && firebaseUID) {
    await copyBillingDetailsToCustomerDoc(
      firebaseUID, 
      subscriptionDetailsFromStripe.default_payment_method as Stripe.PaymentMethod
    );
  }
}
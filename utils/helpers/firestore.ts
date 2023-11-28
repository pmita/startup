// FIREBASE ADMIN
import { firestore, fromMillis, arrayUnion, arrayRemove } from "../firebase-admin";
// STRIPE
import { stripe } from "../stripe";
import Stripe from "stripe";
// TYPES
import { StripeWebhookSubscirptionEvents } from "@/types";

// export async function updateProduct(product: Stripe.Product) {
//   // extract details from incoming product object and update firestore fields
//   const { id, active, name, description, metadata } = product;
//   const response = await firestore
//     .collection('products').doc(id)
//     .set({
//       id,
//       active,
//       name,
//       description,
//       image: product.images?.[0] ?? null,
//       metadata
//     }, { merge: true });

//   // throw error if response is null
//   if (!response) throw new Error('Failed to create product on firestore');

//   // log success
//   console.log(`Inserted/updated product [${id}]`)
// }

// export async function updateProductPrice(price: Stripe.Price) {
//   // extract productStripeId and priceId from incoming event and update firestore fields
//   const { product, id } = price;
//   const response = await firestore
//     .collection('products').doc(product as string)
//     .collection('prices').doc(id)
//     .set({
//       id,
//       firebaseUID: typeof price.product === 'string' ? price.product : '',
//       active: price.active,
//       billing_scheme: price.billing_scheme,
//       currency: price.currency,
//       description: price.nickname ?? null,
//       type: price.type,
//       unit_amount: price.unit_amount ?? 0,
//       unit_amount_decimal: price.unit_amount_decimal ?? '0',
//       interval: price.recurring?.interval ?? null,
//       interval_count: price.recurring?.interval_count ?? null,
//       metadata: price.metadata,
//     }, { merge: true });

//     // throw error if response is null
//     if (!response) throw new Error('Failed to create price on firestore');

//     // log success
//     console.log(`Inserted/updated price [${id}] for product [${product}]`);
// }

export async function updateInvoices(invoice: Stripe.Invoice) {
  // extract user details
  const userRef = await firestore.collection('users').where('stripeCustomerId', '==', invoice.customer).get();
  const { uid: FirebaseUID } = userRef?.docs[0]?.data() ?? {};

  if (!FirebaseUID) throw new Error('No user found with this customer ID');

  const response = await userRef.docs[0].ref
    .collection('invoices')
    .doc(invoice.id)
    .set({
      id: invoice.id,
      amount_paid: invoice.amount_paid,
      created: invoice.created
        ? fromMillis(invoice.created * 1000)
        : null,
      paid: invoice.paid,
      status: invoice.status,
    }, { merge: true });


  if (!response) throw new Error('Failed to update user invoices');

  console.log(`Inserted/updated invoice id [${invoice.id}] for user ${FirebaseUID}`);
}

// export async function copyBillingDetailsToCustomerDoc(
//   firebaseUID: string,
//   payment_method: Stripe.PaymentMethod
// ) {
//   // extract customer details from stripe
//   const stripeCustomerId = payment_method.customer as string;
//   const { name, phone, address } = payment_method.billing_details;

//   // if any of the following details are missing, throw an error
//   if (!name || !phone || !address) return;

//   // usince this is a new subscription, then save the billing details on user's stripe account
//   await stripe.customers.update(stripeCustomerId, {
//     name,
//     phone,
//     address: {
//       line1: address?.line1 ?? '',
//       line2: address?.line2 ?? '',
//       city: address?.city ?? undefined,
//       state: address?.state ?? '',
//       postal_code: address?.postal_code ?? '',
//       country: address?.country ?? ''
//     }
//   });

//   // at last update the user's billing details on firestore
//   const response = await firestore.collection('users').doc(firebaseUID).update({
//     billing_address: {...address},
//     payment_method: {...payment_method[payment_method.type]}
//   });

//   // throw error if response is null
//   if (!response) throw new Error('Failed to update user billing details');
// }

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

  // batch.set(subscriptionRef, {
  //   subscriptionUID: subscriptionId,
  //   firebaseUID: uid,
  //   metadata: subscriptionDetailsFromStripe.metadata,
  //   status: subscriptionDetailsFromStripe.status,
  //   price_id: subscriptionDetailsFromStripe.items.data[0].price.id,
  //   cancel_at_period_end: subscriptionDetailsFromStripe.cancel_at_period_end,
  //   cancel_at: subscriptionDetailsFromStripe.cancel_at
  //     ? fromMillis(subscriptionDetailsFromStripe.cancel_at * 1000)
  //     : null,
  //   canceled_At: subscriptionDetailsFromStripe.canceled_at
  //     ? fromMillis(subscriptionDetailsFromStripe.canceled_at * 1000)
  //     : null,
  //   currect_period_start: subscriptionDetailsFromStripe.current_period_start
  //     ? fromMillis(subscriptionDetailsFromStripe.current_period_start * 1000)
  //     : null,
  //   currect_period_end: subscriptionDetailsFromStripe.current_period_end
  //     ? fromMillis(subscriptionDetailsFromStripe.current_period_end * 1000)
  //     : null,
  //   created: subscriptionDetailsFromStripe.created
  //     ? fromMillis(subscriptionDetailsFromStripe.created * 1000)
  //     : null,
  //   ended_at: subscriptionDetailsFromStripe.ended_at 
  //     ? fromMillis(subscriptionDetailsFromStripe.ended_at * 1000)
  //     : null,
  // }, { merge: true });
  
  if(!response) {
    throw new Error('Failed to update user pro status');
  } else {
    console.log('User pro status updated successfully');
  }
}
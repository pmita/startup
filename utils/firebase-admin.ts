// FIREBASE ADMIN
import admin from "firebase-admin";
// STRIPE
import { stripe } from "./stripe";
import Stripe from "stripe";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID
    } as admin.ServiceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

// SERVICES
export const firestore = admin.firestore();
export const firebaseAuth = admin.auth();

// FUNCTIONS
export async function validateUser(req: Request) {
  // grab auth token from http headers
  const headers = new Headers(req.headers);
  const bearerToken = headers.get('authorization')?.split('Bearer ')[1] || '';

  // look up the user on firebase
  const decodedToken = await firebaseAuth.verifyIdToken(bearerToken);
  const user = { uid: decodedToken.uid, email: decodedToken.email };

  // if nothing shows up, user doesn't exist and we should throw an error
  if (!user.uid) {
    throw new Error('You must be logged in to make this request');
  }

  return user;
}

export async function getOrCreateCustomer(uid: string, params?: Stripe.CustomerCreateParams) {
  // extract user info
  const userDocument = await firestore.collection('users').doc(uid).get();
  const { stripeCustomerId, email } = userDocument.data() ?? {};

  if (!stripeCustomerId) {
    // create new stripe customer if their details don't exist on firestore
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        firebaseUID: uid
      },
      ...params
    })

    await userDocument.ref.update({stripeCustomerId: customer.id });
    return customer;
  } else {
    // otherwise, retrieve customer with firebaseUID
    return await stripe.customers.retrieve(stripeCustomerId);
  }
}

export async function manageSubscriptionStatusChange(
  subscriptionId: string,
  customer?: string,
  createAction?: boolean 
) {
  // retrieve user from firestore from stripeId
  const userDoc = (await firestore.collection('users').where('stripeCustomerId', '==', customer).get());
  const { uid } = userDoc.docs[0].data() ?? {};

  const customerOnStripe = await getOrCreateCustomer('fLbk8VJXAuNKsExmF9HgPnBFLt02');
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });


  const response = await firestore.collection('users').doc('fLbk8VJXAuNKsExmF9HgPnBFLt02').collection('subscriptions').doc(subscriptionId).set({
    id: subscription.id,
    user_id: 'fLbk8VJXAuNKsExmF9HgPnBFLt02',
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    cancel_at_period_end: subscription.cancel_at_period_end,
  });

  // if (error) throw new Error(error.message);
  if (!response) throw new Error('Failed to create subscription on firestore');

  console.log(`Inserted/updated subscription [${subscription.id}] for user [fLbk8VJXAuNKsExmF9HgPnBFLt02]`)
}

export async function updateProductOnFirestore(product: Stripe.Product) {
  const { id, active, name, description, metadata } = product;
  const response = await firestore.collection('products').doc(id).set({
    id,
    active,
    name,
    description,
    image: product.images?.[0] ?? null,
    metadata
  }, { merge: true });

  if (!response) throw new Error('Failed to create product on firestore');

  console.log(`Inserted/updated product [${id}]`)
}
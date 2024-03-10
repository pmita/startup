// FIREBASE ADMIN
import { firebaseAuth, firestore } from "@/utils/firebase-admin";
// STRIPE
import { stripe } from "@/utils/stripe";
// PACKAGES
import Cookies from 'js-cookie';
// TYPES
import Stripe from "stripe";

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

export function getAuthToken(): string | undefined {
  return Cookies.get('__session');
}

export function removeAuthToken(): void {
  return Cookies.remove('__session');
}

export function setAuthToken(token: string): string | undefined {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // expire cookies after 5 days

  return Cookies.set('__session', token, {
    expires: expiresIn,
    secure: true,
    http: true,
  });
}


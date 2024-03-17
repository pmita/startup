// NEXT
import { cookies } from 'next/headers';
// FIREBASE
import { firebaseAuth } from "@/utils/firebase-admin";

export async function getCurrentUser() {
  const nextCookies = cookies();
  const authToken = nextCookies.get('__session');

  let user = null;

  if(authToken) {
    try {
      user = await firebaseAuth.verifyIdToken(authToken?.value);
    } catch (error) {
      throw new Error('User not authenticated');
    }
  }

  return user;
}
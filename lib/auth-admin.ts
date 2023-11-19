// FIREBASE
import { firebaseAuth } from "@/utils/firebase-admin";

// FUNCTIONS
export async function validateUser(req: Request) {
  const headers = new Headers(req.headers);
  const bearerToken = headers.get('authorization')?.split('Bearer ')[1] || '';

  const decodedToken = await firebaseAuth.verifyIdToken(bearerToken);
  const user = { uid: decodedToken.uid, email: decodedToken.email };

  if (!user.uid) {
    throw new Error('You must be logged in to make this request');
  }

  return user;
}

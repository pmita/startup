import { useState } from 'react';
import { auth } from '../utils/firebase';
import firebase from 'firebase';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [user, setUser] = useState<firebase.User | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try{
      const response = await auth.signInWithEmailAndPassword(email, password);

      if (!response.user) {
        throw new Error('Something went wrong during sign in');
      }

      setUser(response.user);

    } catch(error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { signIn, loading, error, user}
}
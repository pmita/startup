import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// FIREBASE
import { auth } from '@/utils/firebase';
// HOOKS
import { useAuthContext } from './useAuthContext';
// TYPES
import {  AuthActionTypes } from '@/types/AuthContextTypes';

export const useSignIn = () => {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  // HOOKS
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(false);
    setError(null);

    try{
      const response = await auth.signInWithEmailAndPassword(email, password);
      
      if (!response.user) {
        throw new Error('Something went wrong during sign in');
      }

      dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }

      router.push('/');
    } catch(error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signIn, error ,isLoading }
}
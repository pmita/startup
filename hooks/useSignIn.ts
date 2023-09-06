import { useState, useEffect } from 'react';
// FIREBASE
import { auth } from '@/utils/firebase';
// HOOKS
import { useAuthContext } from './useAuthContext';
// TYPES
import {  AuthActionTypes } from '@/types/AuthContextTypes';

export const useSignIn = () => {
  const { dispatch } = useAuthContext();
  // const [loading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null | string>(null);
  // const [user, setUser] = useState<firebase.User | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const signIn = async (email: string, password: string) => {
    dispatch({ type: AuthActionTypes.SIGN_IN_PENDING });

    try{
      const response = await auth.signInWithEmailAndPassword(email, password);
      
      if (!response.user) {
        throw new Error('Something went wrong during sign in');
      }

      dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });

      if (!isCancelled) {
        dispatch({ type: AuthActionTypes.SING_IN_RESET })
      }

    } catch(error) {
      if (!isCancelled) {
        dispatch({ type: AuthActionTypes.SING_IN_FAILED, payload: (error as Error).message});
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signIn }
}
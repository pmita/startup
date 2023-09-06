import { useState, useEffect } from 'react';
// FIREBASE
import { auth, firestore } from '@/utils/firebase';
// HOOKS
import { useAuthContext } from './useAuthContext';
// TYPES
import {  AuthActionTypes } from '@/types/AuthContextTypes';

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  // const [loading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null | string>(null);
  // const [user, setUser] = useState<firebase.User | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const signUp = async (email: string, password: string, username: string) => {
    dispatch({ type: AuthActionTypes.SIGN_UP_FAILED });

    try{
      // const response = await auth.signInWithEmailAndPassword(email, password);
      const response = await auth.createUserWithEmailAndPassword(email, password);
      
      if (!response.user) {
        throw new Error('Something went wrong during signUp in');
      }

      await response.user.updateProfile({
        displayName: username,
      })

      await firestore.collection('users').doc(response.user.uid).set({
        displayName: username,
        email,
      })

      dispatch({ type: AuthActionTypes.SIGN_UP_SUCCESS, payload: response.user });

      if (!isCancelled) {
        dispatch({ type: AuthActionTypes.SIGN_UP_RESET })
      }

    } catch(error) {
      if (!isCancelled) {
        dispatch({ type: AuthActionTypes.SIGN_UP_FAILED, payload: (error as Error).message});
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signUp }
}
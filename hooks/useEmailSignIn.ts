import { useState, useEffect } from 'react';
// UTILS
import { auth, actionCodeSettings} from '@/utils/firebase';

export const useEmailSignIn = () => {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);

  const signInWithEmail = async (email: string) => {
    setIsLoading(false);
    setHasEmailBeenSent(false);
    setError(null);

    auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        if(!isCancelled) {
          localStorage.setItem('emailForSignIn', email);
          setIsLoading(false);
          setError(null);
          setHasEmailBeenSent(true);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setIsLoading(false);
          setError((error as Error).message);
          setHasEmailBeenSent(false);
        }
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signInWithEmail, error, isLoading, hasEmailBeenSent };
}
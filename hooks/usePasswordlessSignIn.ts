import { useState } from 'react';
// UTILS
import { firebaseAuth, actionCodeSettings} from '@/utils/firebase';

export const usePasswordlessSignIn = () => {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);

  const sendEmailLink = async (email: string) => {
    setIsLoading(false);
    setHasEmailBeenSent(false);
    setError(null);

    firebaseAuth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        setIsLoading(false);
        setError(null);
        setHasEmailBeenSent(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setError((error as Error).message);
        setHasEmailBeenSent(false);
      });
  };

  return { sendEmailLink, error, isLoading, hasEmailBeenSent };
}
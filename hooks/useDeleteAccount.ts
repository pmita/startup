// REACT
import { useState } from "react";
// HOOKS
import { useAuthState } from "./useAuthState";
// UTILS
import { firebaseAuth, firestore } from "@/utils/firebase";
import { reauthenticate } from "@/utils/helpers";

export const useDeleteAccount = () => {
    // STATE && VARIABLES
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuthState();

    // FUNCTIONS
    const deleteAccount = async (currentPassword:string) => {
        try {
            await reauthenticate(user?.email || '', currentPassword);
            
            try {
                setIsLoading(true);
                setError(null);

                await firebaseAuth.currentUser?.delete();

                const userDocRef = firestore.collection('users').doc(user?.uid);
                const progressionDocRef = firestore.collection('progression').doc(user?.uid);

                const batch = firestore.batch();

                batch.delete(userDocRef);
                batch.delete(progressionDocRef);

                await batch.commit();
            } catch(error) {
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        } catch(error) {
            setError('Current Password is incorrect');
        }

    }

    return { deleteAccount, error, isLoading };
}
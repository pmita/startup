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
        reauthenticate(user?.email || '', currentPassword)?.then(() => {
            setIsLoading(true);
            setError(null);

            firebaseAuth.currentUser?.delete().then(() => {
                const userDocRef = firestore.collection('users').doc(user?.uid);
                const progressionDocRef = firestore.collection('progression').doc(user?.uid);

                const batch = firestore.batch();

                batch.delete(userDocRef);
                batch.delete(progressionDocRef);

                batch.commit().then(() => {
                    console.log("User and progression deleted");
                }).catch((error) => {
                    setError((error as Error).message);
                }).finally(() => {
                    setIsLoading(false);
                })
            }).catch((error) => {
                setError((error as Error).message);
            }).finally(() => {
                setIsLoading(false);
            });
        });

    }

    return { deleteAccount, error, isLoading };
}
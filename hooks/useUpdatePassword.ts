// REACT
import { useState } from "react";
// HOOKS
import { useAuthState } from "./useAuthState";
// UTILS
import { firebaseAuth } from "@/utils/firebase";
import { reauthenticate } from "@/utils/helpers";

export const useUpdatePassword = () => {
    // STATE && VARIABLES
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuthState();

    const updatePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
        try {
            await reauthenticate(user?.email || '', currentPassword);
                
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
            } else {
                try {
                    setIsLoading(true);
                    setError(null);
                    await firebaseAuth.currentUser?.updatePassword(newPassword);
                } catch(error) {
                    setError((error as Error).message);
                } finally {
                    setIsLoading(false);
                }
            }
        } catch(error) {
            setError('Current Password is incorrect');
        }
    };

    return { error, isLoading, updatePassword };
};
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

    const updatePassword = (currentPassword: string, newPassword: string, confirmPassword: string) => {
        reauthenticate(user?.email || '', currentPassword)?.then(() => {
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
            } else {
                setIsLoading(true);
                setError(null);
                firebaseAuth.currentUser?.updatePassword(newPassword).then(() => {
                }).catch((error) => {
                    setError((error as Error).message);
                }).finally(() => {
                    setIsLoading(false);
                });
            }
        });
    };

    return { error, isLoading, updatePassword };
};
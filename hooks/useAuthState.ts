import { useContext } from "react";
// CONTEXT
import { AuthContext } from '@/context/AuthContext';
// TYPES
import { AuthReducerState } from "@/types/AuthContextTypes";

export const useAuthState = (): AuthReducerState => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('useAuthState must be used within a AuthContextProvider');
  }

  return context;
}
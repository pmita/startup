import { useContext } from "react";
// CONTEXT
import { AuthContext } from '@/context/AuthContext';
// TYPES
import { AuthContextType } from "@/types/AuthContextTypes";

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }

  return context;
}
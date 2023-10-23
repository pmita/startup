// REACT
import { useCallback } from 'react';
// HOOKS
import { useAuthState } from './useAuthState';

export const useCheckProgress = () => {
  // HOOKS
  const { userProgress } = useAuthState();

  // FUNCITONS
  const isCompleted = useCallback((itemId: string) => (
    Object.keys(userProgress || {}).includes(itemId || '')
  ), [userProgress]);

  return { isCompleted };
}
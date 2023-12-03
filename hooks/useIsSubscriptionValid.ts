// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// TYPES
import { PRO_STATUS } from '@/types';

export function useIsSubscriptionValid() {
  const { expires, proStatus } = useAuthState();
  const isPaid = proStatus === PRO_STATUS.ACTIVE || proStatus === PRO_STATUS.LIFE_TIME;
  const isPeriodValid = expires > new Date().getTime();

  return isPaid && isPeriodValid;
}
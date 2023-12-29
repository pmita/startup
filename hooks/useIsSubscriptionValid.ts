// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
// TYPES
import { PRO_STATUS } from '@/types';
// UTILS
import { calculateDaysPassed } from '@/utils/helpers';

export function useIsSubscriptionValid() {
  const { expires, proStatus } = useAuthState();
  const isPeriodValid = expires > new Date().getTime();
  const daysPastExpired = calculateDaysPassed(1703560182799);

  console.log(new Date().getTime());

  console.log('days past expired', daysPastExpired)

  switch(proStatus) {
    case PRO_STATUS.LIFE_TIME:
      return true;
    case PRO_STATUS.ACTIVE:
    case PRO_STATUS.CANCELED:
      return isPeriodValid;
    case PRO_STATUS.PAST_DUE:
      return daysPastExpired < 7;
    case PRO_STATUS.UNPAID:
      return daysPastExpired < 15;
    default:
      return false;
  }
}
"use client"

// HOOKS
import { useIsSubscriptionValid } from '@/hooks/useIsSubscriptionValid';

export function Subscriptioncheck(props: any) {
  const isUserPro = useIsSubscriptionValid();

  return !isUserPro ? <>{props.children}</> : props.fallback || null;
}
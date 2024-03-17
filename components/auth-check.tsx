"use client"

// HOOKS
import { useAuthState } from '@/hooks/useAuthState';

export function AuthCheck(props: any) {
  const { user } = useAuthState();

  return user ? <>{props.children}</> : props.fallback || null;
}
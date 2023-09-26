"use client"

// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';

export default function AuthCheck(props: any) {
  const { user } = useAuthContext();

  return user ? <>{props.children}</> : props.fallback || null;
}
"use client"

// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  return user ? <>{children}</> : null;
}
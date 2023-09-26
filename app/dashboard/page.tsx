"use client" 

import { useEffect } from 'react';
import { useRouter } from 'next/router';
// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';

export default function SignInPage(){
  // HOOKS
  const router = useRouter();
  const { user } = useAuthContext();

  // USE EFFECTS
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <section>
      <h1>Welcome to User Profile</h1>
    </section>
  );
}
"use client" 

import { useEffect } from 'react';
import { useRouter } from 'next/router';
// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';
import { useSignIn } from '@/hooks/useSignIn';
// COMPONENTS
import InputField from '@/components/InputField';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signInInputs } from '@/utils/formInputs';

interface SignInFormInput {
  email: string;
  password: string;
}

type FormErrors = {
  email: string;
  password: string;
}

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
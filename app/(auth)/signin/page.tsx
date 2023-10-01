"use client" 

import { useEffect } from 'react';
import { type Metadata } from 'next';
import { useRouter } from 'next/navigation';
// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';
import { useConfirmEmailSignIn } from '@/hooks/useConfirmEmailSignIn';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { useEmailSignIn } from '@/hooks/useEmailSignIn';
// COMPONENTS
import InputField from '@/components/InputField';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signInBInputs } from '@/utils/formInputs';
import { auth } from '@/utils/firebase';

interface SignInFormInput {
  email: string;
  password: string;
}

type FormErrors = {
  email: string;
  password: string;
}

export const MetaData: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
    title: 'Sign In',
    description: 'Sign in to your account'
}

export default function SignInBPage(){
  // HOOKS
  const router = useRouter();
  const { user } = useAuthContext();
  const { signInWithEmail, isLoading, hasEmailBeenSent } = useEmailSignIn();
  const { signInWithEmailConfirmed, isLoading: isLoadingConfirmed } = useConfirmEmailSignIn();
  const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, formState: {errors } } = useForm<SignInFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignInFormInput> = async ({ email }) => {
    signInWithEmail(email);
  }

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      router.push('/');
    } else {
      if(auth.isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem('emailForSignIn');
        if(!email) {
          email = window.prompt('Please provide your email for confirmation') as string;
        }

        if(email) {
          signInWithEmailConfirmed(email);
        }
      }
    }
  }, [router, signInWithEmailConfirmed, user]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[350] p-2 flex flex-col justify-center items-stretch gap-5 text-center"
    >
      <h1 className="w-full">Welcome, please sign in!</h1>
      {signInBInputs && signInBInputs.map((input) => (
        <InputField
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof FormErrors]?.message}
        />
      ))}

      {isLoading 
        ? <button className="button" type="submit" disabled>Loading ...</button>
        : <button className="button" type="submit">Send Email</button>
      }

      <button className="button" onClick={() => signInWithGoogle()}>
        Google Sign In
      </button>
    </form>
  );
}
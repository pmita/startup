"use client" 

import { useEffect } from 'react';
import { type Metadata } from 'next';
import { useRouter } from 'next/navigation';
// HOOKS
import { useAuthContext } from '@/hooks/useAuthContext';
import { useSignIn } from '@/hooks/useSignIn';
// COMPONENTS
import InputField from '@/components/InputField';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signInInputs } from '@/utils/formInputs';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';

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

export default function SignInPage(){
  // HOOKS
  const router = useRouter();
  const { user } = useAuthContext();
  const { signIn, isLoading } = useSignIn();
  const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, formState: {errors } } = useForm<SignInFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignInFormInput> = async ({ email, password}) => {
    signIn(email, password);
  }

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[350] p-2 flex flex-col justify-center items-stretch gap-5 text-center"
    >
      <h1 className="w-full">Welcome, please sign in!</h1>
      {signInInputs && signInInputs.map((input) => (
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
        : <button className="button" type="submit">Log In</button>
      }

      <button className="button" onClick={() => signInWithGoogle()}>
        Google Sign In
      </button>
    </form>
  );
}
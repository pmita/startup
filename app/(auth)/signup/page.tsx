"use client" 

import { useEffect } from 'react';
import { type Metadata } from 'next';
import { useRouter } from 'next/navigation';
// HOOKS
import { useSignUp } from '@/hooks/useSignUp';
import { useAuthContext } from '@/hooks/useAuthContext';
// COMPONENTS
import InputField from '@/components/InputField';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signUpInputs } from '@/utils/formInputs';

interface SignUpFormInput {
  email: string;
  password: string;
  username: string;
}

type FormErrors = {
  email: string;
  password: string;
  username: string;
}

export const MetaData: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
    title: 'Sign Up',
    description: 'Sign up for an account'
}

export default function SignUpPage(){
  // HOOKS 
  const router = useRouter();
  const { signUp, isLoading, error } = useSignUp();
  const { user } = useAuthContext();
  const { register, handleSubmit, formState: {errors }, reset } = useForm<SignUpFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignUpFormInput> = async ({ email, password, username}) => {
    signUp(email, password, username);
  }

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5 text-center">
      <h1 className="w-full">Welcome, please sign up!</h1>
      {signUpInputs && signUpInputs.map((input) => (
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
        : <button className="button" type="submit">Sign Up</button>
      }
    </form>
  );
}
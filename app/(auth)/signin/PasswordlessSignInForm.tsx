"use client" 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
import { useConfirmPasswordlessSignIn } from '@/hooks/useConfirmPasswordlessSignIn';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { usePasswordlessSignIn } from '@/hooks/usePasswordlessSignIn';
// COMPONENTS
import InputField from '@/components/InputField';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signInBInputs } from '@/utils/formInputs';
import { firebaseAuth } from '@/utils/firebase';
// LIB
import { cn } from '@/lib/util';

interface FormInput {
  email: string;
}

type FormErrors = {
  email: string;
}

export default function PasswordlessSignInForm(){
  // HOOKS
  const router = useRouter();
  const { user } = useAuthState();
  const { sendEmailLink, isLoading, hasEmailBeenSent } = usePasswordlessSignIn();
  const { confirmEmailLink } = useConfirmPasswordlessSignIn();
  const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, formState: {errors } } = useForm<FormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<FormInput> = async ({ email }) => {
    sendEmailLink(email);
  }

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      router.push('/');
    } else {
      if(firebaseAuth.isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem('emailForSignIn');
        if(!email) {
          email = window.prompt('Please provide your email for confirmation') as string;
        }

        if(email) {
          confirmEmailLink(email);
        }
      }
    }
  }, [router, confirmEmailLink, user]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[350] p-2 flex flex-col justify-center items-stretch gap-5 text-center"
    >
      <h1 className="w-full text-xl">Sign In</h1>
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

      {hasEmailBeenSent && (
        <p className="text-primary-black">
          Email has been sent! Please check your inbox.
        </p>
      )}
      
      {isLoading 
        ? <button className="button" type="submit" disabled>Loading ...</button>
        : <button className="button" type="submit">Send Email</button>
      }
      <button 
        className={cn(
          "button",
          "bg-primary-white border-primary-black text-primary-black hover:bg-primary-black hover:text-primary-white"
        )}
        onClick={() => signInWithGoogle()}
      >
        Google Sign In
      </button>
    </form>
  );
}
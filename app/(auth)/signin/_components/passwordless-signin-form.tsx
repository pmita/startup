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
import { buttonVariants } from '@/components/ui/Button';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// UTILS
import { signInInputs } from '@/config/forms';
import { firebaseAuth } from '@/utils/firebase';
// UTILS
import { cn } from '@/utils/helpers';
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
    }
  }, [router, user]);

  useEffect(() => {
    if(firebaseAuth.isSignInWithEmailLink(window.location.href)) {
      let email = localStorage.getItem('emailForSignIn');
      if(!email) {
        email = window.prompt('Please provide your email for confirmation') as string;
      }

      if(email) {
        confirmEmailLink(email);
      }
    }
  }, [confirmEmailLink]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[350] p-2 flex flex-col justify-center items-stretch gap-5 text-center"
    >
      <h1 className="w-full text-xl">Sign In</h1>
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

      {hasEmailBeenSent && (
        <p className="text-primary-black">
          Email has been sent! Please check your inbox.
        </p>
      )}
      
      {isLoading 
        ? <button className={cn(buttonVariants({ variant: "secondaryOutlined" }))} type="submit" disabled>Loading ...</button>
        : <button className={cn(buttonVariants({ variant: "secondaryOutlined" }))} type="submit">Send Email</button>
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
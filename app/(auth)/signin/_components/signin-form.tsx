"use client" 

// NEXT]
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// REACT
import { useEffect } from 'react';
// HOOKS
import { useAuthState } from '@/hooks/useAuthState';
import { useSignIn } from '@/hooks/useSignIn';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import { InputField } from '@/components/input-field';
import { Button, buttonVariants } from '@/components/ui/button';
// CONFIG
import { signInInputs } from '@/config/forms';
// UTILS
import { cn } from '@/utils/helpers';

export type SignUpFormProps = {
  formTitle?: React.ReactNode;
}

interface ISignInForm {
  email: string;
  password: string;
}

type ISignInFormErrors = {
  email: string;
  password: string;
}

export function SignInForm({ formTitle }: SignUpFormProps){
  // STATE & HOOKS 
  const router = useRouter();
  const { user } = useAuthState();
  const { signIn, isLoading } = useSignIn();
  const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, formState: {errors } } = useForm<ISignInForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<ISignInForm> = async ({ email, password }) => {
    signIn(email, password);
  }

  // USE EFFECT
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
      {formTitle && formTitle}
      
      {signInInputs && signInInputs.map((input) => (
        <InputField
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof ISignInFormErrors]?.message}
        />
      ))}

      <Button
        className={buttonVariants({ variant: "secondary" })}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </Button>

      <p>- OR CONTINUE WITH -</p>

      <Button
        className={cn(buttonVariants({ variant: "secondaryOutlined", size: "default" }))}
        onClick={signInWithGoogle}
        type="button"
      >
        Sign in with Google
      </Button>
      
      <Link 
        href="/signup" 
        className="font-semibold underline"
      >
        Not a member? Sign Up
      </Link>
    </form>
  );
}
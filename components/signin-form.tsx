"use client" 

// NEXT]
import { useRouter } from 'next/navigation';
// REACT
import { useEffect } from 'react';
// HOOKS
import { useSignIn } from '@/hooks/useSignIn';
import { useAuthState } from '@/hooks/useAuthState';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';
import { Button, buttonVariants } from '@/components/ui/Button';
// CONFIG
import { signInInputs } from '@/config/forms';

interface ISignInForm {
  email: string;
  password: string;
}

type ISignInFormErrors = {
  email: string;
  password: string;
}

export function SignInForm(){
  // STATE & HOOKS 
  const router = useRouter();
  const { user } = useAuthState();
  const { signIn, isLoading } = useSignIn();
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
      <h1 className="w-full">Welcome, please sign in!</h1>
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
        className={buttonVariants({ variant: "primary" })}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </Button>
    </form>
  );
}
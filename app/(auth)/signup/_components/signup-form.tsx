"use client" 

// NEXT
import { useRouter } from 'next/navigation';
// REACT
import { useEffect } from 'react';
// HOOKS
import { useSignUp } from '@/hooks/useSignUp';
import { useAuthState } from '@/hooks/useAuthState';
// LIBRARIES
import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';
import { Button, buttonVariants } from '@/components/ui/Button';
// CONFIG
import { signUpInputs } from '@/config/forms';

export type SignUpFormProps = {
  formTitle?: React.ReactNode;
}

interface ISignUpForm {
  email: string;
  password: string;
  username: string;
}

type ISignUpFormErrors = {
  email: string;
  password: string;
  username: string;
}

export function SignUpForm({ formTitle }: SignUpFormProps){
  // HOOKS 
  const router = useRouter();
  const { signUp, isLoading } = useSignUp();
  const { user } = useAuthState();
  const { register, handleSubmit, formState: {errors }, reset } = useForm<ISignUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<ISignUpForm> = async ({ email, password, username}) => {
    signUp(email, password, username);
  }

  // USE EFFECT
  useEffect(() => {
    if (user) {
      reset();
      router.push('/');
    }
  }, [reset, router, user]);



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5 text-center">
      {formTitle && formTitle}
      
      {signUpInputs && signUpInputs.map((input) => (
        <InputField
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof ISignUpFormErrors]?.message}
        />
      ))}

      <Button
        className={buttonVariants({ variant: "secondary" })}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Loading...' : 'Sign Up'}
      </Button>
    </form>
  );
}
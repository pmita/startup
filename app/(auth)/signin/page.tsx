"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';
// STYLES
import './style.css';

interface SignInFormInput {
  email: string;
  password: string;
}

export default function SignInPage(){
  // HOOKS 
  const { register, handleSubmit, formState: {errors } } = useForm<SignInFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignInFormInput> = (data) => console.log(data);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[350] p-2 flex flex-col justify-center items-stretch gap-5"
    >
      <h1 className="w-full">Welcome, please sign in!</h1>
      <InputField
        name="email"
        type="email"
        placeholder="Email"
        register={register}
        validationSchema={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          }
        }}
        error={errors.email?.message}
      />

      <InputField
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        validationSchema={{
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
          }
        }}
        error={errors.password?.message}
      />

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
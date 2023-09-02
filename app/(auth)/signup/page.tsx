"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';
// STYLES
import './style.css';

interface SignUpFormInput {
  email: string;
  password: string;
  username: string;
}

export default function SignUpPage(){
  // HOOKS 
  const { register, handleSubmit, formState: {errors } } = useForm<SignUpFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5">
      <h1 className="w-full">Welcome, please sign up!</h1>
      <InputField
        error={errors.email}
        placeholder="Email"
        {...register("email", {
          required: {
            value: true,
            message: 'This Field is required'
          },
          maxLength: {
            value: 25,
            message: 'No more than 25 characters'
          },
          minLength: {
            value: 5,
            message: 'No less than 5 characters'
          },
          pattern: /^\S+@\S+$/i,
        })}      
      />

      <InputField
        error={errors.password}
        placeholder="pasword"
        {...register("password", {
          required: {
            value: true,
            message: 'This Field is required'
          },
          maxLength: {
            value: 25,
            message: 'No more than 25 characters'
          },
          minLength: {
            value: 5,
            message: 'No less than 5 characters'
          },
          pattern: /^\S+@\S+$/i,
        })}
      />

      <InputField
        error={errors.username}
        placeholder="username"
        {...register("username", {
          required: {
            value: true,
            message: 'This Field is required'
          },
          minLength: {
            value: 5,
            message: 'No less than 5 characters'
          },
          maxLength: {
            value: 25,
            message: 'No more than 25 characters'
          },
          pattern: /^\S+@\S+$/i,
        })}
      />

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
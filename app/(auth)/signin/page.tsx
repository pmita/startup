"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
import './style.css';
// COMPONENTS
import InputField from '@/components/InputField';

interface IFormInput {
  email: string;
  password: string;
  lastName: string;
}

export default function SignInPage(){
  // HOOKS 
  const { register, handleSubmit, formState: {errors } } = useForm<IFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      lastName: '',
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5">
      <h1 className="w-full">Welcome, please sign in!</h1>
      <input
        type="text"
        placeholder="name"
        {...register("lastName", {
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
        })
        }
      />
      <InputField
        // change={() => console.log('hey from onChange function')}
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
      {errors.email && <span>{errors.email.message}</span>}

      <InputField
        // change={() => console.log('hey from second input form')}
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
      {errors.password && <span>{errors.password.message}</span>}

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
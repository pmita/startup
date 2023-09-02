"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
import './style.css';
// FONTS
import { poppins, roboto } from '@/app/font';

interface IFormInput {
  email: string;
  password: string;
}

export default function SignInPage(){
  const { register, handleSubmit } = useForm<IFormInput>();

  // EVENTS
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5">
      <h1 className="w-full">Welcome, please sign in!</h1>
      <input
        className="text-black"
        placeholder='Email'
        {...register("email", {
          required: true,
          maxLength: 80,
          minLength: 5,
          pattern: /^\S+@\S+$/i,
        })}
      />

      <input
        placeholder="Password"
        {...register("password", {
          required: true,
          maxLength: 25,
          minLength: 5,
          pattern: /^\S+@\S+$/i,
        })}
      />

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
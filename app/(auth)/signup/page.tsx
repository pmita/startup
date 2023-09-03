"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';

interface SignUpFormInput {
  email: string;
  password: string;
  username: string;
}

export default function SignUpPage(){
  // HOOKS 
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
  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => {
    console.log('welcome from submit form');
    reset();
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5">
      <h1 className="w-full">Welcome, please sign up!</h1>
      <input 
          type="email"
          placeholder="Email"
          className={`max-width-[100%] border-solid border-4 border-main-black p-2`}
          {...register("email",{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            }
          })}
        />
      {errors.email && <span>{errors.email.message}</span>}

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

      <InputField
        name="username"
        type="text"
        placeholder="Username"
        register={register}
        validationSchema={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must have at least 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Username must have at most 20 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Username must contain only letters and numbers",
          }
        }}
        error={errors.username?.message}
      />

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
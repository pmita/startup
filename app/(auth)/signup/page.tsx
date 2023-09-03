"use client" 

import { SubmitHandler, useForm } from 'react-hook-form';
// COMPONENTS
import InputField from '@/components/InputField';
import { signUpInputs } from '@/utils/formInputs';

interface SignUpFormInput {
  email: string;
  password: string;
  username: string;
}

type FormErrors = {
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-xl sm:w-lg flex flex-col justify-center items-stretch gap-5 text-center">
      <h1 className="w-full">Welcome, please sign up!</h1>
      {signUpInputs && signUpInputs.map((input) => (
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

      <button className="button" type="submit">Log In</button>
    </form>
  );
}
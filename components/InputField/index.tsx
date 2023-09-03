"use client"

import { InputFieldProps } from './types';

export default function InputField({
  name,
  label,
  register,
  validationSchema,
  type,
  placeholder,
  error,
  ...rest
}: InputFieldProps) : JSX.Element {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-5">
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className="w-full border-solid border-4 border-black p-2"
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, validationSchema)}
        {...rest}
      />

      {error && (
        <span className="text-primary-error">{error}</span>
      )}
    </div>
  )
}
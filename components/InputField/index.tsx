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
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, validationSchema)}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}
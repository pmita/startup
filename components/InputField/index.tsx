"use client"

import { InputFieldProps } from './types';

export default function InputField({
  type,
  placeholder,
  error,
  ...rest
}: InputFieldProps) : JSX.Element {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span>{error.message}</span>}
    </div>
  )
}
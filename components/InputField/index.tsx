"use client"

import { InputFieldProps } from './types';

export default function InputField({
  type,
  // value,
  placeholder,
  // change,
  // ref,
  ...rest
}: InputFieldProps) : JSX.Element {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        // ref={ref}
        {...rest}
      />
    </div>
  )
}
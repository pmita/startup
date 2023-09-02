"use client"

import { InputFieldProps } from './types';

export default function InputField({
  type,
  value,
  placeholder,
  change,
  ref,
  ...rest
}: InputFieldProps) : JSX.Element {
  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={change}
        ref={ref}
        {...rest}
      />
    </div>
  )
}
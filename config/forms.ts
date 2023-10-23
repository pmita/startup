export const signInInputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validationSchema: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      }
    }
  }
];
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
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validationSchema: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
      }
    }
  }
];

export const signUpInputs = [
  ...signInInputs,
  {
    id: 3,
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validationSchema: {
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
];

export const updatePasswordInputs = [
  {
    id: 1,
    name: 'currentPassword',
    type: 'text',
    placeholder: 'Current Password',
    validationSchema: {
      required: "Current Password is required"
    }
  },
  {
    id: 2,
    name: 'newPassword',
    type: 'text',
    placeholder: 'New Password',
    validationSchema: {
      required: "New Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
      }
    }
  },
  {
    id: 3,
    name: 'confirmPassword',
    type: 'text',
    placeholder: 'Confirm Password',
    validationSchema: {
      required: "Confirm Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
      }
    }
  },
] 
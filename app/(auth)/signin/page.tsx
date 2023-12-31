// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import PasswordlessSignInForm from './PasswordlessSignInForm';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/signin'),
    title: 'Sign In',
    description: 'Sign in to your account'
}

export default async function SignInPage(){
  return <PasswordlessSignInForm />;
}
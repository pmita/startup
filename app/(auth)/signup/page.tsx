// NEXT
import { type Metadata } from 'next';
// COMPONENTS
import { SignUpForm } from '@/components/signup-form';


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/signup'),
    title: 'Sign Up',
    description: 'Sign up for a new account'
}

export default async function SignInPage(){
  return (
    <>
      <SignUpForm />
    </>
  )
}
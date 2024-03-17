// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { SignUpForm } from './_components/signup-form';
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
// UTILS
import { cn } from '@/utils/helpers';


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/signup'),
    title: 'Sign Up',
    description: 'Sign up for a new account'
}

export default async function SignInPage(){
  return (
    <>
      <SignUpForm 
        formTitle={
          <Header
            className="flex flex-col justify-start items-center gap-5 pl-5"
            headerTitle={
              <Title 
                title="Welcome to the team"
                className={cn(titleVariants({ 
                  variant: "secondary", 
                  size: "lg",
                  className: "capitalize" 
                }))}
              />
            }
            headerDescription={
              <Description
                description="Please enter your details to sign up"
                className={cn(descriptionVariants({
                  variant: "secondary",
                  size: "default"
                }))}
              />
            }
          />
        }
      />
    </>
  )
}
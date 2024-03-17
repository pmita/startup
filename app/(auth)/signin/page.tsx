// NEXT
import type { Metadata } from 'next'
// COMPONENTS
import { SignInForm } from './_components/signin-form';
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
// UTILS
import { cn } from '@/utils/helpers';


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/signin'),
    title: 'Sign In',
    description: 'Sign in to your account'
}

export default async function SignInPage(){
  return (
    <>
      <SignInForm 
        formTitle={
          <Header
            className="flex flex-col justify-start items-center gap-5 pl-5"
            headerTitle={
              <Title 
                title="Welcome back"
                className={cn(titleVariants({ 
                  variant: "secondary", 
                  size: "lg",
                  className: "capitalize" 
                }))}
              />
            }
            headerDescription={
              <Description
                description="Enter Your Email to sign in to your account"
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
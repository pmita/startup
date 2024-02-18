"use client" 

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card";
import { Button, buttonVariants } from "@/components/ui/Button";
import Avatar from '@/components/Avatar';
// UTILS
import { cn } from "@/utils/helpers";
import { useAuthState } from "@/hooks/useAuthState";
import { useSignOut } from "@/hooks/useSignOut";

export function UpdateAvatar() {
  // STATE & HOOKS
  const { user } = useAuthState();
  return (
    <>
    <Card className="flex flex-col justify-center items-center">
      <CardHeader>
        <CardDescription>
          <Avatar
            src={'/${user?.photoURL}'}
            width={250}
            height={250}
            altText={user?.displayName ?? 'John Doe'}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignOutButton />
      </CardContent>
    </Card>
    </>
  )
}

export function SignOutButton() {
  // STATE & HOOKS
  const { signOut, isLoading } = useSignOut();
  
  return (
    <Button
      className={cn(buttonVariants({ variant: "primary" }))}
      onClick={signOut}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign Out'}
    </Button>
  )
}
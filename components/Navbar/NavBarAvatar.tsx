"use client"

// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// COMPONENTS
import { SignInButton } from "../Buttons"
import Avatar from "../Avatar";

export default function NavbarAvatar() {
  const { user } = useAuthState();

  return (
  <>
    {user 
      ? (
      <Avatar 
        src={'/${user?.photoURL}'} 
        width={40} 
        height={40} 
        altText="John Doe" 
      />)
      : <SignInButton />
    }
  </>
  )
}
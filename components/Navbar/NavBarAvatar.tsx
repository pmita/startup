"use client"

// HOOKS
import { useAuthContext } from "@/hooks/useAuthContext"
// COMPONENTS
import { SignInButton } from "../Buttons"
import Avatar from "../Avatar";

export default function NavbarAvatar() {
  const { user } = useAuthContext();

  return (
  <>
    {user 
      ? (
      <Avatar 
        src={user?.photoURL} 
        width={40} 
        height={40} 
        altText="John Doe" 
      />)
      : <SignInButton />
    }
  </>
  )
}
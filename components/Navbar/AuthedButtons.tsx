"use client"

// HOOKS
import { useAuthContext } from "@/hooks/useAuthContext";
// COMPONENTS
import { SignOutButton, SignInButton} from "../Buttons";

export default function AuthedButtons() {
  // HOOKS
  const { user } = useAuthContext();

  return user ? <SignOutButton /> : <SignInButton />;
}
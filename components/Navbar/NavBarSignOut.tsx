"use client"

// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// COMPONENTS
import { SignOutButton } from "../Buttons";

export default function NavBarSignOut() {
  // HOOKS
  const { user } = useAuthState();

  return user && <SignOutButton />;
}
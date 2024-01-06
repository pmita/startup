"use client"

// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
// COMPONENTS
import { SignOutButton } from "../Buttons/SignOutButton";

export default function NavBarSignOut() {
  // HOOKS
  const { user } = useAuthState();

  return user && <SignOutButton />;
}
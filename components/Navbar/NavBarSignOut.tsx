"use client"

// HOOKS
import { useAuthContext } from "@/hooks/useAuthContext";
// COMPONENTS
import { SignOutButton } from "../Buttons";

export default function NavBarSignOut() {
  // HOOKS
  const { user } = useAuthContext();

  return user && <SignOutButton />;
}
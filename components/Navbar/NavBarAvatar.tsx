"use client"

// COMPONENTS
import AuthCheck from "../AuthCheck"
import { SignInButton } from "../Buttons"

export default function Avatar() {
  return (
    <AuthCheck fallback={<SignInButton />}>
      <div className="flex items-center justify-center">
        <h3 className="ml-2">John Doe</h3>
      </div>
    </AuthCheck>
  )
}
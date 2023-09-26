import Link from "next/link"
// FONTS
import { poppins } from "@/app/font"
// COMPONENTS
import AuthedButtons from "./AuthedButtons"
import Avatar from "../Avatar"

export default async function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <h2 
            className={`${poppins.className} font-[700]`}
          >
            Codaro.io
          </h2>
        </Link>
      </div>
      <ul className="flex-1 flex justify-end items-center gap-10 content-between">
        <li className="navLink">
          <Link href={"/pro"}>
            Pro
            </Link>
          </li>
        <li className="navLink">
          <Link href={"/classes"}>
            Classes
          </Link>
        </li>
        <AuthedButtons />
        <Avatar />
      </ul>
    </nav>
  )
}
import Link from "next/link"
// COMPONENTS
import NavBarAvatar from "./NavBarAvatar"

export default async function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <h2 
            className="font-poppins font-[700]"
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
        <NavBarAvatar />
      </ul>
    </nav>
  )
}
import Link from "next/link"
// COMPONENTS
import NavBarAvatar from "./NavBarAvatar"

export default async function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <h2 
            className="text-2xl p-4 font-poppins font-bold"
          >
            Codaro.io
          </h2>
        </Link>
      </div>
      <ul className="flex-1 flex justify-end items-center gap-10 content-between">
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/pro"}>
            Pro
            </Link>
          </li>
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/courses"}>
            Courses
          </Link>
        </li>
        <NavBarAvatar />
      </ul>
    </nav>
  )
}
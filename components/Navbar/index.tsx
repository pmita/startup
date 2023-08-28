import Link from "next/link"
// FONTS
import { poppins } from "@/app/font"

export default function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <h2 
          className={`${poppins.className} font-[700]`}
        >
          Codaro.io
        </h2>
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
        <li>
          <button className="primary-button">
            Login
          </button>
        </li>
      </ul>
    </nav>
  )
}
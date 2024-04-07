import Link from "next/link"
// COMPONENTS
import { ShouldShowProLink, ShouldShowDashboardLink } from './authed-options';

export async function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <h2 
            className="text-2xl p-4 font-poppins font-bold"
          >
            Codaro<span className="text-primary">.io</span>
          </h2>
        </Link>
      </div>
      <ul className="flex-1 flex justify-end items-center gap-10 content-between">
        <ShouldShowProLink />
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/blog"}>
            Blog
            </Link>
          </li>
        <li className="hover:scale-105 hover:opacity-75 font-semibold">
          <Link href={"/courses"}>
            Courses
          </Link>
        </li>
        <ShouldShowDashboardLink />
      </ul>
    </nav>
  )
}
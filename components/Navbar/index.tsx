"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="min-h-10">
      <h2>Codaro.io</h2>
      <ul className="">
        <li><Link href={"/pro"}>Pro</Link></li>
        <li><Link href={"/classes"}>Classes</Link></li>
        <li><button>Login</button></li>
      </ul>
    </nav>
  )
}
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="min-h-10 w-screen p-10 md:p-8 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center">
        <h2 className="">Codaro.io</h2>
      </div>
      <ul className="flex-1 flex justify-end gap-10 content-between">
        <li><Link href={"/pro"}>Pro</Link></li>
        <li><Link href={"/classes"}>Classes</Link></li>
        <li><button>Login</button></li>
      </ul>
    </nav>
  )
}
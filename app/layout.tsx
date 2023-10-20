import type { Metadata } from 'next'
// COMPONENTS
import Navbar from '@/components/Navbar';
import { AuthContextProvider } from '@/context/AuthContext';
// UTILS
import { fontRoboto, fontPoppins } from '@/lib/font';
import './globals.css'


export const metadata: Metadata = {
  title: 'Codaro.io - The easiest way to learn to code in Greek!',
  description: 'The number one platform for web development taught in Greek',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontRoboto.variable} ${fontPoppins.variable}`}>
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}

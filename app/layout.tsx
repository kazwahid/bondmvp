import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Bond - Beautiful Loyalty for Coffee Shops',
  description: 'Create stunning digital loyalty programs that customers love.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-coffee-100 text-coffee-800 min-h-screen">
        {children}
      </body>
    </html>
  )
}
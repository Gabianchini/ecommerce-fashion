import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trend',
  description: 'A ecommerce project to develop Next.js, Type Script knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <header>
      <link rel="shortcut icon" type="imagex/png" href="shirt.png"></link>
      </header>
      <body className={inter.className}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  )
}

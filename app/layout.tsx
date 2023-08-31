import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from '@/components/ui/toaster';
import { ProModal } from '@/components/companion/pro-modal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PausePlayRepeat AI',
  description: 'AI Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ProModal />
            {children}
      </ThemeProvider>
      <Toaster />
      </body>
    </html>
    <Analytics />
    </ClerkProvider>
  )
}

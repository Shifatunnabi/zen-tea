import { Playfair_Display, Inter, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import React from 'react'
import { LanguageProvider } from '@/lib/language-context'
import { LoadingScreen } from '@/components/loading-screen'
import { NavigationLoader } from '@/components/navigation-loader'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bangla',
  display: 'swap',
})

export const metadata = {
  title: 'Zen Tea - True Taste of Bangladesh | Premium B2B Tea Supplier',
  description: 'Premium Bangladeshi tea supplier for international B2B markets. Authentic tea blends from Sylhet, Sreemangal & Panchagarh. Wholesale & distribution partnerships available.',
  keywords: 'Bangladesh tea, B2B tea supplier, wholesale tea, premium black tea, tea export, authentic tea',
}

export const viewport = {
  themeColor: '#50823c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoSansBengali.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <LoadingScreen />
          <NavigationLoader />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

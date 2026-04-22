import type { Metadata } from 'next'
import { Orbitron, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  // ❌ removed 300 (not supported)
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inteliglo Digital Intelligence Agency',
  description:
    'Full-spectrum digital agency: Web Development, SEO, Paid Ads, Social Media Marketing, Cybersecurity, AI Chatbots, and more.',
  keywords: [
    'digital agency',
    'web development',
    'SEO',
    'social media marketing',
    'cybersecurity',
    'AI chatbot',
    'Google Ads',
    'Meta Ads',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

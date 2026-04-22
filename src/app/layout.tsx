import type { Metadata } from 'next'
import Script from 'next/script'
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
  title: 'Inteliglo | Digital Intelligence Agency – AI, Growth & Cybersecurity',
  description:
    'Inteliglo is a full-spectrum digital intelligence agency delivering website development, AI-powered marketing, automation, paid ads, SEO, cybersecurity, and growth systems that scale brands globally.',
  keywords: [
    'Inteliglo',
    'digital intelligence agency',
    'AI marketing agency',
    'website development',
    'Next.js development',
    'React development',
    'SEO services',
    'paid advertising',
    'Google Ads',
    'Meta Ads',
    'social media marketing',
    'video production',
    'branding and design',
    'AI chatbot development',
    'AI customer support',
    'AI sales automation',
    'AI calling',
    'WhatsApp marketing',
    'email marketing',
    'conversion rate optimization',
    'CRO',
    'customer acquisition cost',
    'CAC optimization',
    'retention strategies',
    'sales funnel building',
    'CRM integration',
    'content marketing',
    'analytics and reporting',
    'real-time dashboard',
    'P&L tracking',
    'cybersecurity services',
    'penetration testing',
    'threat monitoring',
    'cloud migration',
    'digital growth agency',
    'full stack digital services',
    'AI automation agency',
  ],
};


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

      <head>

        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){
          n.callMethod
            ? n.callMethod.apply(n,arguments)
            : n.queue.push(arguments)
        };
        if(!f._fbq)f._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        t=b.createElement(e);
        t.async=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '4330339817239647');
      fbq('track', 'PageView');
    `
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4330339817239647&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>


      </head>
      <body style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MarqueeBand from '@/components/ui/MarqueeBand'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <MarqueeBand />
      </div>
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
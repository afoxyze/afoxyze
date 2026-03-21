import { useRef, useState, useEffect } from 'react'
import { useMountEffect } from './hooks/useMountEffect'
import Hero from './components/Hero'
import WhatIDo from './components/WhatIDo'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const orbRef = useRef<HTMLDivElement>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useMountEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isMobile) return

    const handleMouse = (e: MouseEvent) => {
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${e.clientX - 125}px, ${e.clientY - 125}px)`
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  })

  return (
    <div className="min-h-screen bg-dark text-text-primary relative">
      <div
        ref={orbRef}
        className="glow-orb"
        style={{ top: 0, left: 0, transform: 'translate(-500px, -500px)' }}
      />
      <main className="max-w-3xl mx-auto px-6 relative z-10">
        <Hero />
        <hr className="border-dark-border" />
        <WhatIDo />
        <hr className="border-dark-border" />
        <Projects />
        <hr className="border-dark-border" />
        <Experience />
        <hr className="border-dark-border" />
        <Contact />
        <Footer />
      </main>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 text-text-muted hover:text-accent transition-all duration-300 cursor-pointer bg-transparent border-none text-lg ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App

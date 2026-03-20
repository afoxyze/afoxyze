import { useRef } from 'react'
import { useMountEffect } from './hooks/useMountEffect'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const orbRef = useRef<HTMLDivElement>(null)

  useMountEffect(() => {
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
        <Skills />
        <hr className="border-dark-border" />
        <Projects />
        <hr className="border-dark-border" />
        <Experience />
        <hr className="border-dark-border" />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App

import { useRef } from 'react'
import { ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon } from './icons'
import { useMountEffect } from '../hooks/useMountEffect'

const skills = [
  { name: "React", icon: <ReactIcon /> },
  { name: "Next.js", icon: <NextjsIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
  { name: "Tailwind CSS", icon: <TailwindIcon /> },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useMountEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.stagger-in').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 120)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  })

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Skills
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="stagger-in flex flex-col items-center gap-3 px-6 py-6 bg-dark-card border border-dark-border rounded-xl font-mono text-sm text-text-secondary hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 cursor-default"
          >
            <span className="text-2xl">{skill.icon}</span>
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { CodeIcon, ServerIcon, BookOpenIcon } from './icons'
import { useMountEffect } from '../hooks/useMountEffect'

const cards = [
  {
    title: 'Web Development',
    icon: <CodeIcon />,
    description: 'Building websites and web apps — any framework, any language, whatever gets the job done.',
  },
  {
    title: 'IT Infrastructure',
    icon: <ServerIcon />,
    description: 'Hardware repair, OS installation, machine setup, POS configuration, networks — the guy people call to make things work.',
  },
  {
    title: 'Continuous Learning',
    icon: <BookOpenIcon />,
    description: 'Whatever looks interesting. Right now it\'s web dev, tomorrow it could be something else entirely.',
  },
]

export default function WhatIDo() {
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
    <section id="what-i-do" ref={sectionRef} className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        What I Do
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="stagger-in flex flex-col gap-3 p-6 bg-dark-card border border-dark-border rounded-xl hover:border-accent hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            <span className="text-accent">{card.icon}</span>
            <p className="font-semibold text-base text-text-primary">{card.title}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

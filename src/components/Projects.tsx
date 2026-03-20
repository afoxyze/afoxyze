import { useFadeIn } from '../hooks/useFadeIn'

export default function Projects() {
  const ref = useFadeIn()
  return (
    <section id="projects" ref={ref} className="fade-in py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Projects
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        What I've Built
      </h2>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Currently working on new projects. Stay tuned.
      </p>
      <div className="bg-dark-card border border-dark-border rounded-xl p-8 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p className="font-mono text-sm text-text-muted">
          Building something new...
        </p>
      </div>
    </section>
  )
}

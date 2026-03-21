import { useFadeIn } from '../hooks/useFadeIn'

export default function Experience() {
  const ref = useFadeIn()
  return (
    <section id="experience" ref={ref} className="fade-in py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Experience
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        Where I've Been
      </h2>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Started from admin, now we're here.
      </p>
      <div className="bg-dark-card border border-dark-border rounded-xl p-8 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="font-mono text-sm text-text-muted">
          Open to opportunities
        </p>
      </div>
    </section>
  )
}

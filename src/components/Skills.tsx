const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "SQLite", "Node.js", "Drizzle ORM", "Git"
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Skills
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg font-mono text-sm text-text-secondary hover:border-accent hover:text-accent transition cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

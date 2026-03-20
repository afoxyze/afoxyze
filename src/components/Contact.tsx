const contacts = [
  { label: "Email", value: "agung@email.com", href: "mailto:agung@email.com" },
  { label: "GitHub", value: "github.com/agung", href: "https://github.com/agung" },
  { label: "LinkedIn", value: "linkedin.com/in/agung", href: "https://linkedin.com/in/agung" },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Contact
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-3">
        Get in Touch
      </h2>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Interested in working together? Let's connect.
      </p>
      <div className="flex flex-col gap-3 max-w-sm">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-4 bg-dark-card border border-dark-border rounded-xl text-text-secondary hover:border-accent hover:text-accent transition"
          >
            <span className="font-mono text-xs tracking-wider text-text-muted uppercase w-16">
              {c.label}
            </span>
            <span className="text-sm">{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

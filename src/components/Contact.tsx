import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { useFadeIn } from "../hooks/useFadeIn";

const contacts = [
  {
    label: "Email",
    value: "agung.febryanto3@gmail.com",
    href: "mailto:agung.febryanto3@email.com",
    icon: <EmailIcon />,
  },
  {
    label: "GitHub",
    value: "github.com/afoxyze",
    href: "https://github.com/afoxyze",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/afoxyze",
    href: "https://linkedin.com/in/afoxyze",
    icon: <LinkedInIcon />,
  },
];

export default function Contact() {
  const ref = useFadeIn()
  return (
    <section id="contact" ref={ref} className="fade-in py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Contact
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-3">Get in Touch</h2>
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
            className="contact-glow flex items-center gap-4 px-5 py-4 bg-dark-card border border-dark-border rounded-xl text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
          >
            {c.icon}
            <span className="text-sm">{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

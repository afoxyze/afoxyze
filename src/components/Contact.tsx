import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { useFadeIn } from "../hooks/useFadeIn";

const contacts = [
  {
    label: "Email",
    value: "agung.febryanto3@gmail.com",
    href: "mailto:agung.febryanto3@gmail.com",
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
      <p className="text-text-secondary mb-8 leading-relaxed">
        Got something in mind? Hit me up.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-glow flex flex-col items-center gap-3 p-6 bg-dark-card border border-dark-border rounded-xl text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
          >
            {c.icon}
            <span className="text-sm font-semibold">{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

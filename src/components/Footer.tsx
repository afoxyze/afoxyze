import { GitHubIcon, LinkedInIcon, EmailIcon } from './icons'

export default function Footer() {
  return (
    <footer className="py-10 border-t border-dark-border flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-mono text-xs text-text-muted hover:text-accent transition cursor-pointer"
        >
          &uarr; Back to top
        </a>
        <div className="flex items-center gap-4">
          <a href="https://github.com/afoxyze" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/afoxyze" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition">
            <LinkedInIcon />
          </a>
          <a href="mailto:agung.febryanto3@gmail.com" className="text-text-muted hover:text-accent transition">
            <EmailIcon />
          </a>
        </div>
      </div>
      <div className="text-center">
        <span className="font-mono text-xs text-text-muted">
          &copy; 2026 Agung Febryanto
        </span>
      </div>
    </footer>
  );
}

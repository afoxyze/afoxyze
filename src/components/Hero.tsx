export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center gap-6 py-20">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
          Full-Stack Developer
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          Hi, I'm <span className="text-accent">Agung</span>
        </h1>
        <p className="mt-4 text-text-secondary text-lg max-w-lg leading-relaxed">
          I build clean, fast, and functional web applications.
          Currently studying Informatics Engineering at Universitas Esa Unggul.
        </p>
      </div>
      <div className="flex gap-4 mt-2">
        <a
          href="#projects"
          className="px-6 py-3 bg-accent text-dark font-semibold text-sm rounded-lg hover:brightness-110 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-dark-border text-text-secondary text-sm rounded-lg hover:border-accent hover:text-accent transition"
        >
          Contact
        </a>
      </div>
    </section>
  )
}

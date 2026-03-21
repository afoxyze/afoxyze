import { useState, useRef } from "react";
import { useMountEffect } from "../hooks/useMountEffect";

function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useMountEffect(() => {
    const timer = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  });

  return { displayed, done };
}

export default function Hero() {
  const { displayed } = useTypewriter("Available for work", 50);

  return (
    <section className="flex flex-col justify-center gap-6 pt-32 pb-20">
      <div className="hero-animate">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="font-mono text-xs tracking-wider text-green-400">
            {displayed}
            <span className="typing-cursor"></span>
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          Hi, I'm <span className="gradient-name">Agung Febryanto</span>
        </h1>
        <p className="mt-4 text-text-primary text-base sm:text-lg leading-relaxed">
          Somewhere between 'it works' and 'why does it work?'
        </p>
        <p className="text-text-secondary leading-relaxed text-base text-justify">
          Started as an office admin, currently in IT support — hardware,
          software, networks, basically setting up machines from zero until
          they're ready to go. A curious mind who loves building things and
          learning something new along the way. Recently got into web
          development, so here I am — figuring it out.
        </p>
      </div>
      <div className="flex gap-4 mt-2 hero-animate-delay">
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
  );
}

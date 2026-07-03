import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PROJECTS } from '../data/projects';

/**
 * Reusable Magnetic wrapper to create tactile attraction to the mouse.
 * Adheres to Clean Code and Zero useEffect standards.
 */
function Magnetic({ children, strength = 12 }: { children: React.ReactNode, strength?: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2) * strength;
    const y = (clientY - (top + height / 2)) / (height / 2) * strength;
    setPos({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word text reveal component for a cinematic entrance.
 */
function StaggeredText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.04 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function PortfolioSlider({ projects }: { projects: typeof PROJECTS }) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  // Sync state back to the Astro button (Clean communication)
  const syncAstroButton = useCallback((isOpen: boolean) => {
    window.dispatchEvent(new CustomEvent('about-state-changed', { detail: { isOpen } }));
  }, []);

  const toggleAbout = useCallback(() => {
    setAboutOpen(prev => {
      const next = !prev;
      syncAstroButton(next);
      return next;
    });
  }, [syncAstroButton]);

  // Initializer callback ref (Client-side, no useEffect)
  const initEvents = useCallback((node: HTMLElement | null) => {
    if (node && !node.dataset.eventInitialized) {
      node.dataset.eventInitialized = "true";
      window.addEventListener('toggle-about', toggleAbout);
      window.addEventListener('preloader-finished', () => setLoaded(true));
    }
  }, [toggleAbout]);

  const go = useCallback((i: number) => {
    if (isAboutOpen) return;
    if (i < 0 || i >= projects.length) return;
    
    setDirection(i > idx ? 1 : -1);
    setIdx(i);
    
    const pct = ((i + 1) / projects.length) * 100;
    const pb = document.getElementById('progress-bar');
    if (pb) pb.style.width = `${pct}%`;
  }, [projects.length, isAboutOpen, idx]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setAboutOpen(false);
      syncAstroButton(false);
      return;
    }
    if (isAboutOpen) return;
    if (e.key === "ArrowLeft") go(idx - 1);
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "Enter") window.open(projects[idx].url, "_blank", "noopener");
  }, [idx, go, projects, isAboutOpen, syncAstroButton]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (isAboutOpen) return;
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    if (e.deltaX > 0) go(idx + 1);
    else go(idx - 1);
  }, [idx, go, isAboutOpen]);

  const currentProject = projects[idx];

  return (
    <div 
      ref={initEvents}
      className="absolute inset-0 flex flex-col focus:outline-none overflow-hidden bg-ink dark:bg-bg" 
      tabIndex={0} 
      role="region"
      aria-label="Portfolio gallery"
      onKeyDown={handleKeyDown} 
      onWheel={handleWheel}
    >
      {/* THE SECRET ABOUT LAYER (Z-Index 0 or 20 when open) */}
      <div className={`absolute inset-0 flex flex-col items-center justify-start pt-4 lg:pt-6 px-6 lg:px-12 text-bg dark:text-ink transition-all duration-500 scrollbar-hide ${isAboutOpen ? 'z-20 opacity-100 pointer-events-auto overflow-y-auto' : 'z-0 opacity-0 pointer-events-none'}`}>
         {/* Grainy Gradient Background */}
         <div className="absolute inset-0 bg-noise animate-grainy-gradient opacity-10 dark:opacity-20 z-[-1]"></div>
         
         <div className="max-w-2xl w-full flex flex-col gap-6 lg:gap-8 pointer-events-auto">
            <h2 className="font-serif italic text-5xl lg:text-7xl font-bold tracking-tight text-bg dark:text-ink">
               {isAboutOpen ? <StaggeredText text="</afoxyze>" delay={0.2} /> : "</afoxyze>"}
            </h2>
            <div className="flex flex-col gap-4 text-sm lg:text-base leading-relaxed max-w-xl text-pretty font-medium dark:font-semibold text-bg dark:text-ink">
               <p>
                 {isAboutOpen ? <StaggeredText text="A meticulous developer focused on crafting highly interactive, performant, and deeply spatial web experiences." delay={0.3} /> : "A meticulous developer focused on crafting highly interactive, performant, and deeply spatial web experiences."}
               </p>
               <p>
                 {isAboutOpen ? <StaggeredText text="Bridging the gap between brutalist editorial design and fluid software engineering. Everything is built with extreme attention to detail and zero compromises." delay={0.5} /> : "Bridging the gap between brutalist editorial design and fluid software engineering. Everything is built with extreme attention to detail and zero compromises."}
               </p>
            </div>
            <div className="flex items-center gap-6 -mt-2 pt-6 border-t border-line/20 dark:border-ink/20 text-xs tracking-widest uppercase font-bold text-bg dark:text-ink">
               <a href="https://github.com/afoxyze" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">GitHub</a>
               <a href="https://www.linkedin.com/in/afoxyze/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
               <a href="mailto:agung.febryanto3@gmail.com" className="hover:opacity-60 transition-opacity">Email</a>
            </div>
         </div>
      </div>

      {/* THE SPATIAL CANVAS (Z-Index 10) */}
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={isLoaded ? {
          scale: isAboutOpen ? 0.85 : 1,
          y: isAboutOpen ? "55vh" : "0vh",
          borderRadius: isAboutOpen ? "32px" : "0px",
          opacity: isAboutOpen ? 0.4 : 1,
        } : { scale: 0.9, y: 40, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => {
          if (isAboutOpen) {
            setAboutOpen(false);
            syncAstroButton(false);
          }
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (isAboutOpen) return;
          const swipeThreshold = 50;
          const isFlick = Math.abs(info.velocity.x) > 500;
          if (info.offset.x > swipeThreshold || (isFlick && info.velocity.x > 0)) {
            go(idx - 1);
          } else if (info.offset.x < -swipeThreshold || (isFlick && info.velocity.x < 0)) {
            go(idx + 1);
          }
        }}
        className={`relative z-10 flex-1 flex flex-col min-h-0 bg-bg dark:bg-dark-bg shadow-[0_0_50px_rgba(0,0,0,0.3)] origin-top transform-gpu will-change-transform ${isAboutOpen ? 'cursor-pointer' : ''}`}
      >
        <div className={`hero-section flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-16 items-center px-6 lg:px-12 pb-6 min-h-0 overflow-hidden ${isAboutOpen ? 'pointer-events-none' : ''}`}>
           {/* LEFT HERO */}
           <section className="hero-left relative flex flex-col justify-center gap-6 lg:gap-10 h-full py-6 order-2 lg:order-1 lg:overflow-hidden">
              <div className="index-stack relative h-[100px] lg:h-[140px] overflow-hidden hidden lg:block shrink-0">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={currentProject.n}
                    initial={{ y: direction >= 0 ? "110%" : "-110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: direction >= 0 ? "-110%" : "110%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="index-num absolute top-0 left-0 text-[100px] lg:text-[140px] leading-[0.85] tracking-[-0.06em] text-ink dark:text-dark-ink flex items-baseline gap-0 font-serif italic font-bold tabular-nums lining-nums"
                  >
                    {currentProject.n.split("").map((d, i) => (
                      <motion.span 
                        key={i} 
                        className="digit inline-block"
                        initial={{ y: direction >= 0 ? "110%" : "-110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {d}
                      </motion.span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="hero-meta flex flex-col gap-4 lg:gap-[22px]">
                 <div className="kicker text-[10px] lg:text-[11px] text-muted dark:text-dark-muted uppercase tracking-[0.2em] flex items-center gap-3 font-medium">
                    <motion.span 
                      key={currentProject.n + 'rule'}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                      className="rule grow max-w-[64px] h-[1px] bg-ink dark:bg-dark-ink"
                    ></motion.span>
                    <AnimatePresence mode="wait">
                       <motion.span
                         key={currentProject.kicker}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 10 }}
                       >
                         {currentProject.kicker}
                       </motion.span>
                    </AnimatePresence>
                 </div>

                 <div className="title-stack relative min-h-[48px] lg:min-h-[88px] overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentProject.title}
                        initial={{ y: direction >= 0 ? "100%" : "-100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: direction >= 0 ? "-110%" : "110%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="project-name text-[36px] lg:text-[68px] font-medium leading-none tracking-[-0.04em] text-balance text-ink dark:text-dark-ink"
                      >
                        {currentProject.title}
                      </motion.div>
                    </AnimatePresence>
                 </div>

                 <div className="desc-stack relative min-h-[80px] lg:min-h-[96px] max-h-[14vh] lg:max-h-[22vh] max-w-[460px] overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentProject.desc}
                        initial={{ y: direction >= 0 ? "80%" : "-80%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: direction >= 0 ? "-80%" : "80%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="project-desc text-sm lg:text-base leading-[1.6] text-ink-2 dark:text-dark-ink-2 text-pretty overflow-y-auto pr-3 overscroll-contain flex-1 custom-scrollbar"
                      >
                        {currentProject.desc}
                      </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
           </section>

           {/* RIGHT HERO - VISUALS */}
           <section className="hero-right relative h-[260px] lg:h-[440px] w-full flex justify-center items-center perspective-[1400px] order-1 lg:order-2 mt-4 lg:mt-0">
              <div className="hero-right-inner relative w-full h-full preserve-3d transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentProject.title}
                    initial={{ x: "12%", rotateY: -8, scale: 0.92, opacity: 0 }}
                    animate={{ x: "0%", rotateY: 0, scale: 1, opacity: 1, zIndex: 3 }}
                    exit={{ x: "-12%", rotateY: 8, scale: 0.92, opacity: 0, zIndex: 1 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-2"
                  >
                    {/* The precisely calculated wrapper to ensure aspect-video never exceeds parent height */}
                    <div className="relative w-full max-w-[462px] lg:max-w-[782px] aspect-video">
                      <a 
                        href={currentProject.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute -top-5 lg:-top-6 left-1 text-[9px] lg:text-[10px] tracking-[0.18em] uppercase text-muted dark:text-dark-muted font-semibold hover:text-ink dark:hover:text-dark-ink transition-colors z-20 cursor-pointer"
                      >
                        {currentProject.domain}
                      </a>

                      {/* The Card */}
                      <div className="relative w-full h-full p-2 lg:p-4 rounded-[14px] bg-card dark:bg-dark-card border border-line dark:border-dark-line shadow-sm flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full rounded-[6px] overflow-hidden bg-bg dark:bg-dark-bg">
                          <div className="visual-fallback absolute inset-0 flex flex-col items-center justify-center gap-[14px] text-muted-2 dark:text-dark-muted-2">
                            <div className="glyph font-sans font-light text-[80px] lg:text-[130px] leading-[0.9] text-ink dark:text-dark-ink tracking-[-0.06em]">{currentProject.glyph}</div>
                            <div className="label text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted dark:text-dark-muted">Project Visual</div>
                          </div>
                          <motion.div 
                            initial={{ clipPath: "inset(100% 0 0 0)" }}
                            animate={{ clipPath: "inset(0% 0 0 0)" }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute inset-0 flex items-center justify-center transform-gpu"
                          >
                              <motion.img 
                                key={currentProject.image}
                                initial={{ scale: 1.15, filter: "brightness(1.4) saturate(0.6)" }}
                                animate={{ scale: 1, filter: "none" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                src={currentProject.image}
                                alt={`${currentProject.title} screenshot`}
                                className="w-full h-full object-cover transition-all dark:brightness-90 dark:saturate-90 transform-gpu will-change-transform"
                                fetchPriority="high"
                                loading="eager"
                              />
                          </motion.div>
                        </div>
                      </div>

                      {/* 3D SATELLITE VISIT BUTTON (OPTION B: FLOATING OUTSIDE BELOW) */}
                      <div className="absolute -bottom-10 lg:-bottom-12 right-2 lg:right-4 z-30">
                        <Magnetic strength={20}>
                          <a 
                            href={currentProject.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group relative flex items-center gap-3 bg-ink dark:bg-bg text-bg dark:text-ink px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:scale-105 border border-line/20 dark:border-dark-line/20 shadow-xl"
                          >
                            <div className="relative h-[1.2em] overflow-hidden">
                              <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                                <span className="h-[1.2em] flex items-center justify-center">Visit</span>
                                <span className="h-[1.2em] flex items-center justify-center">Launch</span>
                              </div>
                            </div>
                            <svg className="w-3 h-3 transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M9 7h8v8"/></svg>
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
           </section>
        </div>

        {/* BOTTOM RAIL */}
        <div className={`rail-bar flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-8 px-6 lg:px-12 pt-6 pb-8 border-t border-line dark:border-dark-line ${isAboutOpen ? 'pointer-events-none' : ''}`}>
           <div className="rail-counter shrink-0 text-[28px] lg:text-[34px] leading-none tracking-[-0.04em] tabular-nums text-ink dark:text-dark-ink flex items-baseline gap-1.5 font-medium col-start-1">
             <span>{currentProject.n}</span>
             <span className="slash text-muted-2 dark:text-dark-muted-2 text-[20px] lg:text-[24px] font-light">/</span>
             <span className="total text-muted dark:text-dark-muted text-[20px] lg:text-[24px] font-normal">{String(projects.length).padStart(2, "0")}</span>
           </div>

           <div className="rail-list hidden lg:flex flex-1 items-center gap-0 overflow-hidden">
             {projects.map((p, i) => (
               <button 
                 key={p.n} 
                 onClick={() => go(i)}
                 className={`rail-item flex-1 min-w-0 py-2 px-4 border-l border-line dark:border-dark-line cursor-pointer text-left transition-all bg-transparent border-none ${i === idx ? 'text-ink dark:text-dark-ink' : 'text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink'}`}
               >
                 <span className={`ri-num block text-[10px] tracking-[0.18em] tabular-nums mb-1 font-medium ${i === idx ? 'text-ink dark:text-dark-ink' : ''}`}>{p.n}</span>
                 <span className="ri-name relative inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.015em] whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className={`w-[5px] h-[5px] rounded-full bg-ink dark:bg-dark-ink transition-all duration-300 ${i === idx ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'}`}></span>
                    {p.title}
                 </span>
                 <div className="ri-bar mt-2 h-[1px] bg-line dark:bg-dark-line relative overflow-hidden">
                   <div className={`absolute left-0 top-0 bottom-0 bg-ink dark:bg-dark-ink transition-all duration-350 ease-out ${i === idx ? 'w-full' : 'w-0'}`}></div>
                 </div>
               </button>
             ))}
           </div>

           <Magnetic>
              <button 
                 onClick={() => go(idx - 1)} 
                 disabled={idx === 0}
                 className="prev-btn flex items-center gap-[14px] py-2 pl-[14px] pr-4 rounded-full border border-line dark:border-dark-line bg-bg dark:bg-dark-bg cursor-pointer transition-all hover:border-ink dark:hover:border-dark-ink hover:-translate-x-[2px] group text-right disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:translate-x-0 ml-auto lg:ml-0"
              >
                 <svg className="nu-arrow w-[14px] h-[14px] text-ink dark:text-dark-ink transition-transform group-hover:-translate-x-[3px] rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6"/></svg>
                   <div className="nu-stack flex flex-col gap-0.5 items-end">
                   <span className="nu-label text-[10px] tracking-[0.2em] uppercase text-muted dark:text-dark-muted font-medium">Previous</span>
                   <span className="nu-name text-[12px] lg:text-[13px] font-medium tracking-[-0.015em] text-ink dark:text-dark-ink">
                     {idx === 0 ? "—" : projects[idx - 1].title}
                   </span>
                 </div>
              </button>
           </Magnetic>

           <Magnetic>
              <button 
                 onClick={() => go(idx + 1)} 
                 disabled={idx === projects.length - 1}
                 className="next-btn flex items-center gap-[14px] py-2 pl-[18px] pr-4 rounded-full border border-line dark:border-dark-line bg-bg dark:bg-dark-bg cursor-pointer transition-all hover:border-ink dark:hover:border-dark-ink hover:translate-x-[2px] group text-left mt-0 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:translate-x-0"
              >
                 <div className="nu-stack flex flex-col gap-0.5">
                   <span className="nu-label text-[10px] tracking-[0.2em] uppercase text-muted font-medium">Next</span>
                   <span className="nu-name text-[12px] lg:text-[13px] font-medium tracking-[-0.015em] text-ink dark:text-dark-ink">
                     {idx === projects.length - 1 ? "—" : projects[idx + 1].title}
                   </span>
                 </div>
                 <svg className="nu-arrow w-[14px] h-[14px] text-ink dark:text-dark-ink transition-transform group-hover:translate-x-[3px] ml-auto lg:ml-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </button>
           </Magnetic>
        </div>
      </motion.div>
    </div>
  );
}
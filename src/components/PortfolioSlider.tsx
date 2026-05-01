import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PROJECTS } from '../data/projects';

export default function PortfolioSlider({ projects }: { projects: typeof PROJECTS }) {
  const [idx, setIdx] = useState(0);

  const go = useCallback((i: number) => {
    if (i < 0 || i >= projects.length) return;
    setIdx(i);
    
    // Manual sync for top progress bar
    const pct = ((i + 1) / projects.length) * 100;
    const pb = document.getElementById('progress-bar');
    if (pb) pb.style.width = `${pct}%`;
  }, [projects.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(idx - 1);
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "Enter") window.open(projects[idx].url, "_blank", "noopener");
  }, [idx, go, projects]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    if (e.deltaX > 0) go(idx + 1);
    else go(idx - 1);
  }, [idx, go]);

  const currentProject = projects[idx];

  return (
    <div 
      className="flex-1 flex flex-col focus:outline-none overflow-hidden transition-colors duration-400" 
      tabIndex={0} 
      role="region"
      aria-label="Portfolio gallery"
      onKeyDown={handleKeyDown} 
      onWheel={handleWheel}
    >
      <div className="hero-section flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-16 items-center px-6 lg:px-12 pb-6 min-h-0 overflow-hidden">
         {/* LEFT HERO */}
         <section className="hero-left relative flex flex-col justify-center lg:justify-between h-full py-6 order-2 lg:order-1 overflow-hidden">
            <div className="index-stack relative h-[140px] lg:h-[240px] overflow-hidden hidden lg:block shrink-0">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentProject.n}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="index-num absolute top-0 left-0 text-[140px] lg:text-[240px] leading-[0.85] tracking-[-0.06em] text-ink dark:text-dark-ink flex gap-0 font-light"
                >
                  {currentProject.n.split("").map((d, i) => (
                    <motion.span 
                      key={i} 
                      className="digit inline-block"
                      initial={{ y: "110%", opacity: 0 }}
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
                  <span className="rule grow max-w-[64px] h-[1px] bg-ink dark:bg-dark-ink"></span>
                  <span>{currentProject.kicker}</span>
               </div>

               <div className="title-stack relative h-[48px] lg:h-[88px] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentProject.title}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="project-name absolute top-0 left-0 text-[36px] lg:text-[68px] font-medium leading-none tracking-[-0.04em] whitespace-nowrap text-ink dark:text-dark-ink"
                    >
                      {currentProject.title}
                    </motion.div>
                  </AnimatePresence>
               </div>

               <div className="desc-stack relative min-h-[80px] lg:min-h-[96px] max-w-[460px]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentProject.desc}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="project-desc absolute top-0 left-0 right-0 text-sm lg:text-base leading-[1.6] text-ink-2 dark:text-dark-ink-2 text-pretty"
                    >
                      {currentProject.desc}
                    </motion.div>
                  </AnimatePresence>
               </div>

               <div className="visit-row flex items-center gap-5 mt-4 lg:mt-6 pt-6 border-t border-line dark:border-dark-line max-w-[480px]">
                  <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="visit-btn inline-flex items-center gap-[14px] py-[12px] lg:py-[14px] px-[20px] lg:px-[22px] rounded-full bg-ink dark:bg-bg-dark text-bg dark:text-ink-dark text-[12px] lg:text-[13px] tracking-[0.02em] font-medium hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all group border dark:border-dark-line">
                    <span>Visit project</span>
                    <span className="arrow-c w-[18px] h-[18px] inline-flex items-center justify-center transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 17L17 7M9 7h8v8"/></svg>
                    </span>
                  </a>
                  <span className="domain-text text-[11px] lg:text-[12px] text-muted dark:text-dark-muted tracking-[0.04em] tabular-nums hidden sm:block">{currentProject.domain}</span>
               </div>
            </div>
         </section>

         {/* RIGHT HERO - VISUALS */}
         <section className="hero-right relative h-[260px] lg:h-[440px] w-full flex justify-center items-center perspective-[1400px] order-1 lg:order-2 mt-4 lg:mt-0">
            <div className="hero-right-inner relative h-full preserve-3d transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentProject.title}
                  initial={{ x: "12%", rotateY: -8, scale: 0.92, opacity: 0, filter: "saturate(.7) brightness(1.02)" }}
                  animate={{ x: "0%", rotateY: 0, scale: 1, opacity: 1, filter: "none", zIndex: 3 }}
                  exit={{ x: "-12%", rotateY: 8, scale: 0.92, opacity: 0, filter: "saturate(.7) brightness(1.02)", zIndex: 1 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 flex flex-col justify-center"
                >
                  <a 
                    href={currentProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute -top-4 lg:-top-6 left-1 text-[9px] lg:text-[10px] tracking-[0.18em] uppercase text-muted dark:text-dark-muted font-semibold hover:text-ink dark:hover:text-dark-ink transition-colors z-20 cursor-pointer"
                  >
                    {currentProject.domain}
                  </a>

                  <div className="relative h-full p-2 lg:p-4 rounded-[14px] bg-card dark:bg-dark-card border border-line dark:border-dark-line shadow-sm flex items-center justify-center overflow-hidden">
                    <div className="relative h-full aspect-[1280/900] rounded-[6px] overflow-hidden bg-bg dark:bg-dark-bg transition-colors dark:bg-gradient-to-b dark:from-[#0f0f0f] dark:to-[#1c1c1c]">
                      <div className="visual-fallback absolute inset-0 flex flex-col items-center justify-center gap-[14px] text-muted-2 dark:text-dark-muted-2">
                        <div className="glyph font-sans font-light text-[80px] lg:text-[130px] leading-[0.9] text-ink dark:text-dark-ink tracking-[-0.06em]">{currentProject.glyph}</div>
                        <div className="label text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted dark:text-dark-muted">Project Visual</div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={currentProject.image}
                            alt={`${currentProject.title} screenshot`}
                            className="w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                          />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
         </section>
      </div>

      {/* BOTTOM RAIL */}
      <div className="rail-bar grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto_auto] items-center gap-4 lg:gap-8 px-6 lg:px-12 pt-6 pb-8 border-t border-line dark:border-dark-line transition-colors">
         <div className="rail-counter text-[28px] lg:text-[34px] leading-none tracking-[-0.04em] tabular-nums text-ink dark:text-dark-ink flex items-baseline gap-1.5 font-medium col-start-1">
           <span>{currentProject.n}</span>
           <span className="slash text-muted-2 dark:text-dark-muted-2 text-[20px] lg:text-[24px] font-light">/</span>
           <span className="total text-muted dark:text-dark-muted text-[20px] lg:text-[24px] font-normal">{String(projects.length).padStart(2, "0")}</span>
         </div>

         <div className="rail-list hidden lg:flex items-center gap-0 overflow-hidden">
           {projects.map((p, i) => (
             <button 
               key={p.n} 
               onClick={() => go(i)}
               className={`rail-item flex-1 min-w-0 py-2 px-4 border-l border-line dark:border-dark-line cursor-pointer text-left transition-all bg-transparent border-none ${i === idx ? 'text-ink dark:text-dark-ink' : 'text-muted dark:text-dark-muted hover:text-ink dark:hover:text-dark-ink'}`}
             >
               <span className={`ri-num block text-[10px] tracking-[0.18em] tabular-nums mb-1 font-medium ${i === idx ? 'text-ink dark:text-dark-ink' : ''}`}>{p.n}</span>
               <span className="ri-name relative inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.015em] whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className={`w-[5px] h-[5px] rounded-full bg-ink dark:bg-dark-ink transition-all duration-300 ${i === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                  {p.title}
               </span>
               <div className="ri-bar mt-2 h-[1px] bg-line dark:bg-dark-line relative overflow-hidden">
                 <div className={`absolute left-0 top-0 bottom-0 bg-ink dark:bg-dark-ink transition-all duration-350 ease-out ${i === idx ? 'w-full' : 'w-0'}`}></div>
               </div>
             </button>
           ))}
         </div>

         <button 
            onClick={() => go(idx - 1)} 
            disabled={idx === 0}
            className="prev-btn hidden lg:flex items-center gap-[14px] py-2 pl-[14px] pr-4 rounded-full border border-line dark:border-dark-line bg-bg dark:bg-dark-bg cursor-pointer transition-all hover:border-ink dark:hover:border-dark-ink hover:-translate-x-[2px] group text-right disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:translate-x-0 ml-auto"
         >
            <svg className="nu-arrow w-[14px] h-[14px] text-ink dark:text-dark-ink transition-transform group-hover:-translate-x-[3px] rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6"/></svg>
            <div className="nu-stack flex flex-col gap-0.5 items-end">
              <span className="nu-label text-[10px] tracking-[0.2em] uppercase text-muted dark:text-dark-muted font-medium">Previous</span>
              <span className="nu-name text-[12px] lg:text-[13px] font-medium tracking-[-0.015em] text-ink dark:text-dark-ink">
                {idx === 0 ? "—" : projects[idx - 1].title}
              </span>
            </div>
         </button>

         <button 
            onClick={() => go(idx + 1)} 
            disabled={idx === projects.length - 1}
            className="next-btn flex items-center gap-[14px] py-2 pl-[18px] pr-4 rounded-full border border-line dark:border-dark-line bg-bg dark:bg-dark-bg cursor-pointer transition-all hover:border-ink dark:hover:border-dark-ink hover:translate-x-[2px] group text-left col-span-2 lg:col-span-1 mt-2 lg:mt-0 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:translate-x-0"
         >
            <div className="nu-stack flex flex-col gap-0.5">
              <span className="nu-label text-[10px] tracking-[0.2em] uppercase text-muted font-medium">Next</span>
              <span className="nu-name text-[12px] lg:text-[13px] font-medium tracking-[-0.015em] text-ink dark:text-dark-ink">
                {idx === projects.length - 1 ? "—" : projects[idx + 1].title}
              </span>
            </div>
            <svg className="nu-arrow w-[14px] h-[14px] text-ink dark:text-dark-ink transition-transform group-hover:translate-x-[3px] ml-auto lg:ml-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6"/></svg>
         </button>
      </div>
    </div>
  );
}
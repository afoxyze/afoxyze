# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark, minimal portfolio website at afoxyze.dev using Vite + React + TypeScript + Tailwind CSS, deployed on Cloudflare Pages.

**Architecture:** Single-page React app with 5 sections (Hero, Skills, Projects, Experience, Contact). Static site with no backend. Dark theme with Notion-like clarity — clean typography, generous whitespace, subtle animations.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, Cloudflare Pages

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `tailwind.config.ts`, `postcss.config.js`

**Step 1: Scaffold Vite + React + TypeScript project**

Run:
```bash
cd C:/Users/agung/project-agung/porto
npm create vite@latest . -- --template react-ts
```

If directory not empty, confirm overwrite.

**Step 2: Install Tailwind CSS**

Run:
```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Tailwind in vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Step 4: Set up src/index.css**

```css
@import "tailwindcss";
```

**Step 5: Clean up default Vite files**

- Delete `src/App.css`
- Delete `src/assets/` folder
- Replace `src/App.tsx` with minimal placeholder:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200">
      <p className="text-center pt-20 text-2xl">afoxyze.dev</p>
    </div>
  )
}

export default App
```

**Step 6: Verify dev server works**

Run: `npm run dev`
Expected: Browser shows dark page with "afoxyze.dev" text

**Step 7: Initialize git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Layout & Fonts

**Files:**
- Modify: `index.html` (add Google Fonts)
- Modify: `src/index.css` (global styles, font definitions)
- Modify: `src/App.tsx` (add layout structure)

**Step 1: Add Google Fonts to index.html**

Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Fonts:
- **Inter** — clean, Notion-like sans-serif for headings and body
- **JetBrains Mono** — monospace for labels and tags

**Step 2: Set global styles in src/index.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --color-dark: #0a0a0f;
  --color-dark-card: #111118;
  --color-dark-border: #1c1c28;
  --color-accent: #00d4ff;
  --color-text-primary: #e8e8ed;
  --color-text-secondary: #7a7a8e;
  --color-text-muted: #4a4a5e;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-dark);
  color: var(--color-text-primary);
}
```

**Step 3: Add layout structure to App.tsx**

```tsx
function App() {
  return (
    <div className="min-h-screen bg-dark text-text-primary">
      <main className="max-w-3xl mx-auto px-6">
        {/* Sections will go here */}
        <p className="pt-20">Layout ready</p>
      </main>
    </div>
  )
}

export default App
```

**Step 4: Verify fonts and dark background render**

Run: `npm run dev`
Expected: Dark background, Inter font applied

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add layout structure, fonts, and design tokens"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx` (import Hero)

**Step 1: Build Hero component**

```tsx
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
```

**Step 2: Import in App.tsx**

```tsx
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-dark text-text-primary">
      <main className="max-w-3xl mx-auto px-6">
        <Hero />
      </main>
    </div>
  )
}

export default App
```

**Step 3: Verify in browser**

Run: `npm run dev`
Expected: Full-height hero with name, tagline, two buttons

**Step 4: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Hero section"
```

---

### Task 4: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`
- Modify: `src/App.tsx` (import Skills)

**Step 1: Build Skills component**

Skills to display: Next.js, React, TypeScript, Tailwind CSS, SQLite, Node.js, Drizzle ORM, Git

```tsx
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
```

**Step 2: Add to App.tsx**

```tsx
import Skills from './components/Skills'
// add <Skills /> after <Hero />
```

**Step 3: Verify**

Run: `npm run dev`
Expected: Skill tags displayed below hero

**Step 4: Commit**

```bash
git add src/components/Skills.tsx src/App.tsx
git commit -m "feat: add Skills section"
```

---

### Task 5: Projects Section (Placeholder)

**Files:**
- Create: `src/components/Projects.tsx`
- Modify: `src/App.tsx`

**Step 1: Build Projects placeholder**

```tsx
export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Projects
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        What I've Built
      </h2>
      <div className="border border-dashed border-dark-border rounded-xl p-12 text-center">
        <p className="font-mono text-sm text-text-muted tracking-wide">
          Coming soon
        </p>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.tsx after Skills**

**Step 3: Verify and commit**

```bash
git add src/components/Projects.tsx src/App.tsx
git commit -m "feat: add Projects section placeholder"
```

---

### Task 6: Experience Section (Placeholder)

**Files:**
- Create: `src/components/Experience.tsx`
- Modify: `src/App.tsx`

**Step 1: Build Experience placeholder**

```tsx
export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
        Experience
      </p>
      <h2 className="text-3xl font-bold tracking-tight mb-8">
        Where I've Worked
      </h2>
      <div className="border border-dashed border-dark-border rounded-xl p-12 text-center">
        <p className="font-mono text-sm text-text-muted tracking-wide">
          Coming soon
        </p>
      </div>
    </section>
  )
}
```

**Step 2: Add to App.tsx after Projects**

**Step 3: Verify and commit**

```bash
git add src/components/Experience.tsx src/App.tsx
git commit -m "feat: add Experience section placeholder"
```

---

### Task 7: Contact Section

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/App.tsx`

**Step 1: Build Contact component**

```tsx
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
```

**Step 2: Add to App.tsx after Experience**

**Step 3: Verify and commit**

```bash
git add src/components/Contact.tsx src/App.tsx
git commit -m "feat: add Contact section"
```

---

### Task 8: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Step 1: Build Footer**

```tsx
export default function Footer() {
  return (
    <footer className="py-10 border-t border-dark-border flex justify-between items-center">
      <span className="font-mono text-xs text-text-muted">
        &copy; 2026 Agung
      </span>
      <span className="font-mono text-xs text-text-muted">
        afoxyze.dev
      </span>
    </footer>
  )
}
```

**Step 2: Add to App.tsx after Contact**

**Step 3: Verify and commit**

```bash
git add src/components/Footer.tsx src/App.tsx
git commit -m "feat: add Footer"
```

---

### Task 9: Polish & Responsive

**Files:**
- Modify: `src/components/Hero.tsx` (responsive text sizes)
- Modify: `index.html` (meta tags, title, favicon)

**Step 1: Update index.html meta**

```html
<title>Agung — Full-Stack Developer</title>
<meta name="description" content="Full-Stack Developer building clean, fast, and functional web applications.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Step 2: Test responsive at 375px, 768px, 1024px widths**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add meta tags and responsive polish"
```

---

### Task 10: Deploy to Cloudflare Pages

**Step 1: Build**

Run: `npm run build`
Expected: `dist/` folder generated

**Step 2: Deploy via Cloudflare dashboard**

1. Go to Cloudflare Dashboard → Pages
2. Create project → Connect to Git (or Direct Upload)
3. Build settings: Framework preset = None, Build command = `npm run build`, Output directory = `dist`
4. Deploy

**Step 3: Connect afoxyze.dev domain**

1. In Pages project → Custom domains → Add `afoxyze.dev`
2. Cloudflare handles DNS + SSL automatically

**Step 4: Verify live site at afoxyze.dev**

**Step 5: Commit any config changes**

```bash
git add -A
git commit -m "chore: deploy to Cloudflare Pages"
```

import { useState, useEffect, useRef } from "react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [expandedProject, setExpandedProject] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const skills = [
    { name: "Next.js", level: 85, color: "#00d4ff" },
    { name: "React", level: 85, color: "#61dafb" },
    { name: "TypeScript", level: 75, color: "#3178c6" },
    { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
    { name: "SQLite", level: 70, color: "#44a8b3" },
    { name: "Node.js", level: 70, color: "#68a063" },
    { name: "Drizzle ORM", level: 70, color: "#c5f74f" },
    { name: "Git", level: 75, color: "#f05032" },
  ];

  const navItems = ["hero", "about", "projects", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'Syne', 'DM Sans', sans-serif",
        background: "#0a0a0f",
        color: "#e8e8ed",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #1a3a4a; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes barFill {
          from { width: 0%; }
          to { width: var(--bar-width); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes borderGlow {
          0%, 100% { border-color: rgba(0, 212, 255, 0.15); }
          50% { border-color: rgba(0, 212, 255, 0.4); }
        }

        .nav-link {
          color: #5a5a6e;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.3s, transform 0.3s;
          padding: 8px 0;
          position: relative;
        }
        .nav-link:hover, .nav-link.active {
          color: #00d4ff;
          transform: translateX(4px);
        }
        .nav-link.active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: #00d4ff;
          border-radius: 50%;
          box-shadow: 0 0 12px #00d4ff;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #00d4ff;
          margin-bottom: 16px;
          opacity: 0.7;
        }

        .skill-tag {
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .skill-tag:hover {
          border-color: rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.1);
        }

        .project-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .project-card:hover {
          border-color: rgba(0, 212, 255, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.05);
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .project-card:hover::before { opacity: 1; }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          color: #b0b0c0;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .contact-link:hover {
          border-color: rgba(0,212,255,0.3);
          color: #00d4ff;
          background: rgba(0,212,255,0.03);
          transform: translateX(8px);
        }

        .grid-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transition: left 0.8s ease-out, top 0.8s ease-out;
        }

        .feature-tag {
          display: inline-block;
          padding: 4px 10px;
          background: rgba(0,212,255,0.08);
          border: 1px solid rgba(0,212,255,0.15);
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #00d4ff;
          margin: 3px;
        }

        .role-badge {
          display: inline-block;
          padding: 3px 8px;
          background: rgba(197,247,79,0.1);
          border: 1px solid rgba(197,247,79,0.2);
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #c5f74f;
          margin: 2px;
        }
      `}</style>

      {/* Background Effects */}
      <div className="grid-bg" />
      <div
        className="glow-orb"
        style={{
          left: `calc(${mousePos.x}% - 250px)`,
          top: `calc(${mousePos.y}% - 250px)`,
        }}
      />

      {/* Fixed Navigation */}
      <nav
        style={{
          position: "fixed",
          left: 40,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          animation: isLoaded ? "fadeIn 1s ease 0.5s both" : "none",
        }}
      >
        {navItems.map((item) => (
          <span
            key={item}
            className={`nav-link ${activeSection === item ? "active" : ""}`}
            onClick={() => scrollTo(item)}
          >
            {item}
          </span>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 80px 0 140px", position: "relative", zIndex: 1 }}>
        
        {/* Hero Section */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              animation: isLoaded ? "fadeUp 0.8s ease both" : "none",
            }}
          >
            <div className="section-label">Full-Stack Developer</div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                marginBottom: 20,
              }}
            >
              <span style={{ color: "#e8e8ed" }}>Agung</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #7b61ff 50%, #c5f74f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Builds Things
              </span>
              <br />
              <span style={{ color: "#5a5a6e", fontSize: 48 }}>for the Web.</span>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: "#7a7a8e",
                maxWidth: 480,
              }}
            >
              Mahasiswa Teknik Informatika di Universitas Esa Unggul.
              Membangun aplikasi web yang cepat, bersih, dan fungsional
              menggunakan Next.js, React, dan TypeScript.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 8,
              animation: isLoaded ? "fadeUp 0.8s ease 0.3s both" : "none",
            }}
          >
            <button
              onClick={() => scrollTo("projects")}
              style={{
                padding: "12px 28px",
                background: "linear-gradient(135deg, #00d4ff, #0099cc)",
                border: "none",
                borderRadius: 8,
                color: "#0a0a0f",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 30px rgba(0,212,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              LIHAT PROYEK
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "12px 28px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#b0b0c0",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(0,212,255,0.4)";
                e.target.style.color = "#00d4ff";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.color = "#b0b0c0";
              }}
            >
              KONTAK
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              animation: "float 3s ease-in-out infinite",
              opacity: 0.4,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3 }}>
              SCROLL
            </span>
            <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #5a5a6e, transparent)" }} />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 40,
            padding: "80px 0",
          }}
        >
          <div>
            <div className="section-label">// tentang saya</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: "-1px",
              }}
            >
              Developer yang suka{" "}
              <span style={{ color: "#00d4ff" }}>problem-solving</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: "#7a7a8e",
                maxWidth: 560,
              }}
            >
              Saya Agung, mahasiswa Teknik Informatika di Universitas Esa Unggul
              (Fakultas Ilmu Komputer). Baru saja menyelesaikan magang MBKM
              di PT. Indomarco Prismatama (Indomaret) sebagai IT Support EDP,
              di mana saya membangun sistem web app dari nol untuk kebutuhan
              operasional lapangan.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: "#7a7a8e",
                maxWidth: 560,
                marginTop: 12,
              }}
            >
              Saya percaya teknologi itu harus bikin hidup lebih gampang —
              dan itulah yang saya coba bangun di setiap proyek.
            </p>
          </div>

          {/* Skills */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>// tech stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="skill-tag"
                  onMouseEnter={() => setHoveredSkill(i)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    background:
                      hoveredSkill === i
                        ? `rgba(${skill.color === "#c5f74f" ? "197,247,79" : skill.color === "#f05032" ? "240,80,50" : skill.color === "#68a063" ? "104,160,99" : "0,212,255"},0.08)`
                        : "rgba(255,255,255,0.02)",
                    borderColor:
                      hoveredSkill === i
                        ? `${skill.color}66`
                        : "rgba(255,255,255,0.08)",
                    color: hoveredSkill === i ? skill.color : "#b0b0c0",
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {skill.name}
                  {hoveredSkill === i && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 2,
                        background: skill.color,
                        borderRadius: 1,
                        animation: "barFill 0.4s ease forwards",
                        "--bar-width": `${skill.level}%`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>// pengalaman</div>
            <div
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                paddingLeft: 24,
              }}
            >
              <div style={{ position: "relative", marginBottom: 8 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -29,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#00d4ff",
                    boxShadow: "0 0 12px rgba(0,212,255,0.4)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  IT Support EDP OPR
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#5a5a6e",
                    marginTop: 4,
                  }}
                >
                  PT. Indomarco Prismatama (Indomaret) — Sep 2025 – Jan 2026
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#7a7a8e",
                    marginTop: 8,
                    lineHeight: 1.7,
                  }}
                >
                  Membangun Field Monitoring System dari nol untuk digitalisasi
                  workflow monitoring teknisi EDP. Menangani troubleshooting
                  hardware/software di cabang Jakarta 1 (Ancol).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
            padding: "80px 0",
          }}
        >
          <div>
            <div className="section-label">// proyek</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-1px",
              }}
            >
              Yang sudah saya <span style={{ color: "#c5f74f" }}>bangun</span>
            </h2>
          </div>

          {/* Project Card */}
          <div
            className="project-card"
            onClick={() => setExpandedProject(!expandedProject)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#c5f74f",
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}
                >
                  01 — WEB APPLICATION
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Field Monitoring System
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#7a7a8e",
                    lineHeight: 1.7,
                    maxWidth: 520,
                  }}
                >
                  Sistem monitoring lapangan untuk teknisi EDP yang mendigitalisasi
                  workflow kunjungan toko, penanganan keluhan, tracking Service
                  Excellent, penjadwalan, dan pengumuman internal.
                </p>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "all 0.3s",
                  transform: expandedProject ? "rotate(45deg)" : "none",
                  color: "#5a5a6e",
                  flexShrink: 0,
                }}
              >
                +
              </div>
            </div>

            {/* Expanded Content */}
            {expandedProject && (
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  animation: "fadeUp 0.4s ease",
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <div className="section-label" style={{ marginBottom: 10 }}>Tech Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite", "Drizzle ORM", "Better Auth"].map(
                      (tech) => (
                        <span key={tech} className="feature-tag">
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div className="section-label" style={{ marginBottom: 10 }}>User Roles</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {["Manager", "Supervisor", "Officer", "EDP OPR"].map((role) => (
                      <span key={role} className="role-badge">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="section-label" style={{ marginBottom: 10 }}>Fitur Utama</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[
                      "Store Visit Monitoring",
                      "Complaint Tracking",
                      "Service Excellent Tracker",
                      "Scheduling System",
                      "Internal Announcements",
                      "Role-based Access",
                      "11 Database Tables",
                    ].map((feature) => (
                      <span key={feature} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coming Soon Placeholder */}
          <div
            style={{
              border: "1px dashed rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 32,
              textAlign: "center",
              animation: "borderGlow 4s ease-in-out infinite",
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#3a3a4e",
                letterSpacing: 2,
              }}
            >
              + MORE PROJECTS COMING SOON
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
            padding: "80px 0",
          }}
        >
          <div>
            <div className="section-label">// kontak</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 8,
              }}
            >
              Mari <span style={{ color: "#00d4ff" }}>terhubung</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "#7a7a8e",
                lineHeight: 1.7,
              }}
            >
              Tertarik untuk kolaborasi atau punya proyek? Hubungi saya.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
            <div className="contact-link">
              <span style={{ fontSize: 18 }}>✉</span>
              <div>
                <div style={{ fontSize: 11, color: "#5a5a6e", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>EMAIL</div>
                <div>agung@email.com</div>
              </div>
            </div>
            <div className="contact-link">
              <span style={{ fontSize: 18 }}>◐</span>
              <div>
                <div style={{ fontSize: 11, color: "#5a5a6e", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>GITHUB</div>
                <div>github.com/agung</div>
              </div>
            </div>
            <div className="contact-link">
              <span style={{ fontSize: 18 }}>▶</span>
              <div>
                <div style={{ fontSize: 11, color: "#5a5a6e", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>LINKEDIN</div>
                <div>linkedin.com/in/agung</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: "40px 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#3a3a4e",
            }}
          >
            © 2026 Agung
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#3a3a4e",
            }}
          >
            Built with Next.js + Tailwind
          </span>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;

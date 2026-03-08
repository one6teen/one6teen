import React, { useState, useEffect, useRef } from "react";

// ── Brand ─────────────────────────────────────────────
const C = {
  black:  "#0A0A0A",
  dark:   "#141414",
  card:   "#1E1E1E",
  mid:    "#2A2A2A",
  border: "#333333",
  red:    "#B5271A",
  dred:   "#8B1D14",
  blood:  "#6B1510",
  white:  "#FFFFFF",
  cream:  "#F7F4F0",
  gray:   "#888888",
  lgray:  "#CCCCCC",
  mgray:  "#555555",
  green:  "#1F5C3E",
};

// ── Nav sections ──────────────────────────────────────
const NAV = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "programmes", label: "Programmes" },
  { id: "passitdown", label: "Pass It Down" },
  { id: "camp",       label: "The Camp" },
  { id: "collective", label: "116 Collective" },
  { id: "involve",    label: "Get Involved" },
  { id: "donate",     label: "Donate" },
  { id: "contact",    label: "Contact" },
];

// ── Stats ─────────────────────────────────────────────
const STATS = [
  { num: "64.5%", label: "of SA children grow up without their father" },
  { num: "62.4%", label: "youth aged 15–24 are unemployed" },
  { num: "1 in 3", label: "young people will never have a meaningful mentor" },
  { num: "18.8%", label: "of children grow up with neither parent present" },
];

// ── Programmes ────────────────────────────────────────
const PROGRAMMES = [
  { title: "Mentorship Circles", desc: "Structured, recurring groups in high schools and communities — where young people are formed by consistent, caring adults who show up week after week.", tag: "ACTIVE" },
  { title: "Worship Circles", desc: "Faith-centred creative gatherings using music, arts, and expression as vehicles for healing, identity, and belonging.", tag: "ACTIVE" },
  { title: "Living Room Sessions", desc: "Monthly evenings of worship held in a private home — intimate, warm, and deeply relational. 20–40 people. Real community.", tag: "ACTIVE" },
  { title: "University Worship", desc: "Formation and worship taken directly onto campuses — where students navigate identity without the support structures they had in school.", tag: "ACTIVE" },
  { title: "Dads Talks", desc: "Honest conversations for fathers and father figures — about presence, purpose, and what the next generation needs from the men in their lives.", tag: "ACTIVE" },
  { title: "The 116 Podcast", desc: "Monthly conversations about fatherhood, identity, faith, and courage. Raw. Honest. Timely. For the generation that needs to hear it most.", tag: "MONTHLY" },
  { title: "UNASHAMED Night", desc: "Our flagship talent showcase — a stage where young people perform, express, and are genuinely celebrated. Courage through creative expression.", tag: "EVENTS" },
  { title: "1:16 Prayer Movement", desc: "Every day at 1:16pm, people across South Africa pause to pray for the next generation. A simple act. A movement.", tag: "DAILY" },
  { title: "Rooted & Rising", desc: "Our flagship personal formation journey — a structured, immersive experience taking a young person from wherever they are to a deep sense of identity and purpose.", tag: "COMING SOON" },
];

// ── Giving tiers ──────────────────────────────────────
const MONTHLY = [
  { tier: "Community Partner",  amt: 116,    impact: "Our entry-level giving circle — accessible to every South African. R116 partners collectively sustain One6Teen's day-to-day mentorship." },
  { tier: "Formation Partner",  amt: 500,    impact: "Sponsors one young person's full participation in a Mentorship Circle for an entire month." },
  { tier: "Worship Partner",    amt: 1000,   impact: "Covers the full cost of a monthly Living Room Session or University Worship gathering." },
  { tier: "Leadership Partner", amt: 2500,   impact: "Funds a full month of programme delivery — circles, creative sessions, Dads Talks, and the coordination that holds it together." },
  { tier: "Impact Partner",     amt: 5000,   impact: "Enables One6Teen to reach new schools, communities, and campuses — expanding the movement every month." },
  { tier: "Foundation Partner", amt: 10000,  impact: "Our highest monthly tier. Foundation Partners directly shape the long-term sustainability of One6Teen. Named in our annual impact report." },
];

const ONCEOF = [
  { amt: 5000,  impact: "Covers the full cost of one Living Room Session." },
  { amt: 10000, impact: "Sponsors 10 young people to attend The Formation Camp." },
  { amt: 20000, impact: "Funds a complete UNASHAMED Night — venue, sound, production, and celebration." },
  { amt: 35000, impact: "A major contribution toward the instrument collection — directly into young musicians' hands." },
  { amt: 50000, impact: "A legacy gift — sponsors an entire quarter of One6Teen's full operations." },
];

// ─────────────────────────────────────────────────────
export default function One6TeenWebsite() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [giveTab, setGiveTab] = useState("monthly");
  const [campCatering, setCampCatering] = useState(false);
  const sectionRefs = useRef({});

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: C.black, color: C.lgray, fontFamily: "'Georgia', serif", overflowX: "hidden" }}>

      {/* ── Sticky Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,10,10,0.96)", backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${C.border}`, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 56,
      }}>
        <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: "bold", color: C.white, letterSpacing: -1 }}>116</span>
          <span style={{ width: 1, height: 20, background: C.red, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: C.gray, letterSpacing: 3, fontFamily: "Calibri, sans-serif" }}>UNASHAMED</span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV.filter(n => n.id !== "home").map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "6px 10px",
              fontSize: 11, fontFamily: "Calibri, sans-serif", letterSpacing: 1.5,
              color: activeNav === n.id ? C.red : C.gray,
              borderBottom: activeNav === n.id ? `2px solid ${C.red}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>{n.label.toUpperCase()}</button>
          ))}
        </div>

        <button onClick={() => scrollTo("donate")} style={{
          background: C.red, border: "none", cursor: "pointer", padding: "8px 18px",
          fontSize: 11, fontFamily: "Calibri, sans-serif", letterSpacing: 2, color: C.white, fontWeight: "bold",
        }}>GIVE NOW</button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "100px 48px 80px", position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${C.blood} 0%, ${C.black} 45%, ${C.dark} 100%)`,
      }}>
        {/* Texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)",
          pointerEvents: "none",
        }} />
        {/* Large 116 background */}
        <div style={{
          position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)",
          fontSize: "clamp(200px, 30vw, 420px)", fontWeight: "bold", color: "rgba(181,39,26,0.06)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: -20,
        }}>116</div>

        <div style={{ maxWidth: 760, position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 24, fontWeight: "bold" }}>
            ONE6TEEN FOUNDATION  ·  ROMANS 1:16  ·  NPC K2026049908
          </div>
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 88px)", fontWeight: "bold", color: C.white,
            lineHeight: 1.05, margin: "0 0 28px", letterSpacing: -2,
          }}>
            Not a resource<br />
            problem.<br />
            <span style={{ color: C.red }}>A formation problem.</span>
          </h1>
          <p style={{ fontSize: 18, color: C.lgray, lineHeight: 1.7, maxWidth: 560, marginBottom: 40, fontStyle: "italic" }}>
            Information without formation produces a directionless generation. One6Teen exists to step into the gap — with mentorship, faith, creative expression, and sport — and form the leaders this generation is waiting for.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("about")} style={{
              background: C.red, border: "none", cursor: "pointer", padding: "14px 32px",
              fontSize: 13, fontFamily: "Calibri, sans-serif", letterSpacing: 2, color: C.white, fontWeight: "bold",
            }}>OUR STORY</button>
            <button onClick={() => scrollTo("involve")} style={{
              background: "none", border: `1px solid ${C.border}`, cursor: "pointer", padding: "14px 32px",
              fontSize: 13, fontFamily: "Calibri, sans-serif", letterSpacing: 2, color: C.lgray,
            }}>GET INVOLVED</button>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: `1px solid ${C.border}`, background: "rgba(0,0,0,0.5)",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "20px 24px", borderRight: i < 3 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ fontSize: 26, fontWeight: "bold", color: C.red, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: C.gray, fontFamily: "Calibri, sans-serif", marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>WHO WE ARE</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "bold", color: C.white, lineHeight: 1.1, marginBottom: 28 }}>
              UNASHAMED.<br />
              <span style={{ color: C.red }}>Romans 1:16.</span>
            </h2>
            <p style={{ lineHeight: 1.85, marginBottom: 20, fontSize: 15 }}>
              One6Teen Foundation (116) is a registered South African Non-Profit Company built on a single conviction: a generation without formation is a generation without direction. We exist to restore intentional mentorship and relational leadership in the lives of young people ages 13–25.
            </p>
            <p style={{ lineHeight: 1.85, marginBottom: 20, fontSize: 15 }}>
              We step into the gaps left by absent fathers and missing role models — equipping youth through faith-informed mentorship, leadership development, creative expression, and sport.
            </p>
            <p style={{ lineHeight: 1.85, fontSize: 15 }}>
              We are not building a programme. We are building a movement. And movements need people — mentors, partners, fathers, and communities willing to show up consistently for the generation that needs them most.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "VISION", text: "A generation formed, guided, and empowered to rise as confident leaders — who transform their communities, society, and world into places of hope, opportunity, and lasting impact." },
              { label: "MISSION", text: "To restore intentional mentorship and relational leadership in the lives of young people by stepping into the gaps left by absent fathers and role models." },
              { label: "TAGLINE", text: "UNASHAMED — For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes. Romans 1:16" },
            ].map((b, i) => (
              <div key={i} style={{ background: C.card, borderLeft: `4px solid ${C.red}`, padding: "20px 24px" }}>
                <div style={{ fontSize: 9, letterSpacing: 4, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 10 }}>{b.label}</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: C.lgray, fontStyle: "italic" }}>{b.text}</div>
              </div>
            ))}
            <div style={{ background: C.dred, padding: "20px 24px" }}>
              <div style={{ fontSize: 9, letterSpacing: 4, color: "#FFCCCC", fontFamily: "Calibri, sans-serif", marginBottom: 12 }}>CORE VALUES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Faith", "Character", "Courage", "Discipline", "Empowerment", "Community", "Excellence"].map(v => (
                  <span key={v} style={{ fontSize: 11, fontFamily: "Calibri, sans-serif", color: C.white, background: "rgba(0,0,0,0.3)", padding: "4px 10px", letterSpacing: 1 }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES ── */}
      <section id="programmes" style={{ padding: "100px 48px", background: C.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>OUR INITIATIVES</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "bold", color: C.white, margin: 0 }}>One Formation Journey.<br />Many Entry Points.</h2>
            <p style={{ fontSize: 14, color: C.gray, maxWidth: 520, margin: "20px auto 0", fontFamily: "Calibri, sans-serif", lineHeight: 1.7 }}>
              Not every young person enters through the same door — sport, music, faith, mentorship. Every path leads to the same destination: identity, character, and courageous leadership.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {PROGRAMMES.map((p, i) => (
              <div key={i} style={{
                background: C.card, borderTop: `3px solid ${p.tag === "COMING SOON" ? C.green : C.red}`,
                padding: "28px 24px", position: "relative",
                transition: "transform 0.2s", cursor: "default",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 9, letterSpacing: 2, color: p.tag === "COMING SOON" ? C.green : C.red, fontFamily: "Calibri, sans-serif", fontWeight: "bold" }}>{p.tag}</div>
                <h3 style={{ fontSize: 16, color: C.white, fontWeight: "bold", margin: "0 0 14px", paddingRight: 70 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: "Calibri, sans-serif" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASS IT DOWN ── */}
      <section id="passitdown" style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>CASCADING MENTORSHIP MODEL</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "bold", color: C.white, margin: "0 0 20px" }}>Pass It Down.</h2>
            <p style={{ fontSize: 16, color: C.lgray, maxWidth: 680, lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              No one is too young to lead. No one is too experienced to still need guidance. Everyone in the chain is simultaneously being poured into and pouring out.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginBottom: 40 }}>
            {[
              { tier: "TIER 1", title: "University Mentors", sub: "University students & young adults", body: "Close enough in age to be relatable. Far enough ahead to be relevant. University students step back into high schools as peer mentors — bringing lived experience and a presence no adult can replicate.", bg: C.dred },
              { tier: "TIER 2", title: "Senior Learners", sub: "Grade 10 · 11 · 12  →  Grade 8 · 9", body: "Within the school, senior learners are trained and deployed as peer mentors. Same corridors. Same culture. Intentional leadership — activated, structured, and consistent.", bg: C.card },
              { tier: "TIER 3", title: "The Pipeline", sub: "Junior learners becoming future mentors", body: "Every young person being mentored today is being formed with the understanding that they are a future mentor. As they grow, they move up the chain. The movement multiplies through people — not budget.", bg: C.green },
            ].map((t, i) => (
              <div key={i} style={{ background: t.bg, padding: "36px 28px", borderTop: `4px solid ${C.red}` }}>
                <div style={{ fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,0.5)", fontFamily: "Calibri, sans-serif", marginBottom: 12 }}>{t.tier}</div>
                <h3 style={{ fontSize: 22, color: C.white, fontWeight: "bold", margin: "0 0 8px" }}>{t.title}</h3>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Calibri, sans-serif", marginBottom: 20, fontWeight: "bold", letterSpacing: 0.5 }}>{t.sub}</div>
                <div style={{ width: 40, height: 2, background: C.red, marginBottom: 20 }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: 0, fontFamily: "Calibri, sans-serif" }}>{t.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background: C.mid, borderLeft: `4px solid ${C.red}`, padding: "24px 28px" }}>
            <span style={{ fontSize: 11, color: C.red, fontFamily: "Calibri, sans-serif", fontWeight: "bold", letterSpacing: 2 }}>WHY IT WORKS: </span>
            <span style={{ fontSize: 14, color: C.lgray, fontStyle: "italic" }}>Peer influence is one of the most powerful forces in a young person's life. Pass It Down does not fight that force — it redirects it.</span>
          </div>
        </div>
      </section>

      {/* ── FORMATION CAMP ── */}
      <section id="camp" style={{ padding: "100px 48px", background: C.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>ANNUAL FLAGSHIP GATHERING</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "bold", color: C.white, lineHeight: 1.1, margin: "0 0 28px" }}>The Formation Camp.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>Once a year. Every generation. Something permanent.</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: C.gray, fontFamily: "Calibri, sans-serif", marginBottom: 20 }}>
                The Formation Camp is One6Teen's annual gathering — a moment set apart from the weekly rhythm of circles and sessions. For three days, youth, fathers, and mentors step out of their ordinary environments and into something intentional.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: C.gray, fontFamily: "Calibri, sans-serif", marginBottom: 32 }}>
                It is not a programme. It is not a conference. It is an encounter — where walls come down, where fathers speak honestly to their children, and where young people discover something about themselves they could not find anywhere else.
              </p>
              <div style={{ fontStyle: "italic", fontSize: 15, color: C.lgray, borderLeft: `3px solid ${C.red}`, paddingLeft: 20, lineHeight: 1.7 }}>
                "Three days where fathers show up, mentors invest, and young people discover who they were always meant to be."
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "◈", title: "Generations Together", body: "Youth, dads, and mentors — not in separate tracks but in the same space, around the same fire, in the same movement. The generation gap closes here." },
                { icon: "◈", title: "Presence Over Programme", body: "Every activity exists to create genuine human presence. Adults who are fully there. Young people who feel fully seen." },
                { icon: "◈", title: "Identity Formed", body: "Three days of intentional formation — being asked the questions that matter, being challenged, being celebrated. Young people leave knowing more about who they are." },
                { icon: "◈", title: "Sent Out With Purpose", body: "The camp ends with a commissioning — every person leaves with purpose and an accountability partner to carry it with them." },
              ].map((h, i) => (
                <div key={i} style={{ background: C.card, padding: "20px 24px", borderLeft: `3px solid ${C.red}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ color: C.red, fontSize: 16, lineHeight: 1, marginTop: 2 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: C.white, fontWeight: "bold", fontFamily: "Calibri, sans-serif", marginBottom: 6 }}>{h.title}</div>
                    <div style={{ fontSize: 12, color: C.gray, fontFamily: "Calibri, sans-serif", lineHeight: 1.6 }}>{h.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 116 COLLECTIVE ── */}
      <section id="collective" style={{ padding: "100px 48px", background: C.black, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", fontSize: 300, fontWeight: "bold", color: "rgba(181,39,26,0.04)", lineHeight: 1, userSelect: "none" }}>116</div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ background: C.dred, padding: "60px 48px" }}>
              <div style={{ fontSize: 10, letterSpacing: 5, color: "#FFCCCC", fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>PERFORMANCE ARTS PLATFORM</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: "bold", color: C.white, margin: "0 0 28px", lineHeight: 1.1 }}>The 116 Collective.</h2>
              <p style={{ fontSize: 14, color: "#FFDDDD", lineHeight: 1.85, fontFamily: "Calibri, sans-serif", marginBottom: 20 }}>
                One6Teen's developing community of performance artists — singers, musicians, and creatives being intentionally mentored, trained, and prepared for real platforms.
              </p>
              <p style={{ fontSize: 14, color: "#FFDDDD", lineHeight: 1.85, fontFamily: "Calibri, sans-serif", marginBottom: 32 }}>
                This is not entertainment for its own sake. It is formation through exposure, and exposure through excellence.
              </p>
              <div style={{ fontStyle: "italic", fontSize: 16, color: C.white, borderTop: `1px solid rgba(255,255,255,0.2)`, paddingTop: 24, lineHeight: 1.6 }}>
                "If you have a stage, we have artists who are ready for it."
              </div>
            </div>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.85, marginBottom: 32, color: C.lgray }}>
                The 116 Collective performs at corporate events, embassy functions, gala dinners, and high-profile platforms. Every performance is an act of formation — young artists discovering who they are through the discipline of their craft and the experience of a real stage.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                {["Corporate Events & Gala Dinners", "Embassy & Government Functions", "Awards Ceremonies", "Community & Church Events", "High-Profile Public Platforms"].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Calibri, sans-serif", fontSize: 13 }}>
                    <span style={{ color: C.red, fontSize: 16 }}>→</span>
                    <span style={{ color: C.lgray }}>{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} style={{
                background: C.red, border: "none", cursor: "pointer", padding: "14px 32px",
                fontSize: 12, fontFamily: "Calibri, sans-serif", letterSpacing: 2, color: C.white, fontWeight: "bold",
              }}>BOOK THE COLLECTIVE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET INVOLVED ── */}
      <section id="involve" style={{ padding: "100px 48px", background: C.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>JOIN THE MOVEMENT</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "bold", color: C.white, margin: 0 }}>There is a role for everyone.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[
              { who: "For Corporates", title: "CSI Partnership", body: "Sponsor a Mentorship Circle. Send employees as trained mentors. Fund UNASHAMED Night. Create internships for 116 alumni. Gain measurable CSR impact and a genuine connection to the next generation.", cta: "Partner With Us" },
              { who: "For Churches & Communities", title: "Open Your Doors", body: "Host a Living Room Session. Mobilise your congregation as mentors. Partner in Dads Talks. Embed 116 into your community outreach. We bring the curriculum and structure — you open the door.", cta: "Get In Touch" },
              { who: "For Individuals", title: "Become a Mentor", body: "No formal qualification required. Just character, consistency, and a genuine commitment to showing up for young people. All mentors receive training and ongoing support.", cta: "Apply to Mentor" },
              { who: "For Schools", title: "Bring 116 In", body: "One6Teen operates directly in high schools — running Mentorship Circles, formation sessions, and the Pass It Down model. If you're a principal or teacher, let's talk.", cta: "Contact Us" },
            ].map((c, i) => (
              <div key={i} style={{ background: C.card, padding: "36px 32px", borderTop: `3px solid ${C.red}` }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 12 }}>{c.who.toUpperCase()}</div>
                <h3 style={{ fontSize: 20, color: C.white, fontWeight: "bold", margin: "0 0 16px" }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.75, fontFamily: "Calibri, sans-serif", marginBottom: 24 }}>{c.body}</p>
                <button onClick={() => scrollTo("contact")} style={{
                  background: "none", border: `1px solid ${C.red}`, cursor: "pointer", padding: "10px 20px",
                  fontSize: 11, fontFamily: "Calibri, sans-serif", letterSpacing: 2, color: C.red,
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.red; }}
                >{c.cta.toUpperCase()} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" style={{ padding: "100px 48px", background: C.black }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>FINANCIAL PARTNERSHIP</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "bold", color: C.white, margin: "0 0 16px" }}>Every rand forms a life.</h2>
            <p style={{ fontSize: 14, color: C.gray, maxWidth: 520, margin: "0 auto", fontFamily: "Calibri, sans-serif", lineHeight: 1.7 }}>
              It costs approximately <strong style={{ color: C.white }}>R2,540 per person per year</strong> to run One6Teen's full mentorship programme, and <strong style={{ color: C.white }}>R1,795 per person</strong> for the Formation Camp. Every giving tier below makes a tangible difference.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: `1px solid ${C.border}` }}>
            {["monthly", "onceof", "costs"].map(t => (
              <button key={t} onClick={() => setGiveTab(t)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "14px 28px",
                fontSize: 12, fontFamily: "Calibri, sans-serif", letterSpacing: 2, fontWeight: "bold",
                color: giveTab === t ? C.white : C.gray,
                borderBottom: giveTab === t ? `3px solid ${C.red}` : "3px solid transparent",
                transition: "all 0.2s", marginBottom: -1,
              }}>
                {t === "monthly" ? "MONTHLY GIVING" : t === "onceof" ? "ONCE-OFF GIFTS" : "COST BREAKDOWN"}
              </button>
            ))}
          </div>

          {/* Monthly */}
          {giveTab === "monthly" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {MONTHLY.map((m, i) => (
                <div key={i} style={{ background: C.card, borderTop: `3px solid ${i >= 4 ? C.dred : C.red}`, padding: "28px 24px" }}>
                  <div style={{ fontSize: 11, color: C.gray, fontFamily: "Calibri, sans-serif", letterSpacing: 1, marginBottom: 8 }}>{m.tier.toUpperCase()}</div>
                  <div style={{ fontSize: 36, color: C.red, fontWeight: "bold", lineHeight: 1, marginBottom: 4 }}>R{m.amt.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: C.gray, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>/month</div>
                  <div style={{ width: 32, height: 2, background: C.red, marginBottom: 16 }} />
                  <p style={{ fontSize: 12, color: C.gray, fontFamily: "Calibri, sans-serif", lineHeight: 1.7, margin: 0 }}>{m.impact}</p>
                </div>
              ))}
            </div>
          )}

          {/* Once-off */}
          {giveTab === "onceof" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ONCEOF.map((o, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", background: i % 2 === 0 ? C.card : C.mid, borderLeft: `4px solid ${C.red}` }}>
                  <div style={{ fontSize: 24, color: C.red, fontWeight: "bold", minWidth: 110 }}>R{o.amt.toLocaleString()}</div>
                  <div style={{ flex: 1, paddingLeft: 24, fontSize: 14, color: C.lgray, fontFamily: "Calibri, sans-serif", lineHeight: 1.6 }}>{o.impact}</div>
                </div>
              ))}
            </div>
          )}

          {/* Cost breakdown */}
          {giveTab === "costs" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 20, fontWeight: "bold" }}>ANNUAL PROGRAMME — PER PERSON</div>
                {[
                  ["Mentor coordination & training", "R800"],
                  ["Materials & workbooks", "R350"],
                  ["Circle refreshments", "R390"],
                  ["Transport subsidy", "R600"],
                  ["Admin & coordination", "R200"],
                  ["Events (shared)", "R200"],
                ].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "Calibri, sans-serif", fontSize: 13 }}>
                    <span style={{ color: C.lgray }}>{l}</span>
                    <span style={{ color: C.red, fontWeight: "bold" }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontFamily: "Calibri, sans-serif", fontSize: 16, fontWeight: "bold" }}>
                  <span style={{ color: C.white }}>TOTAL ANNUAL</span>
                  <span style={{ color: C.red }}>±R2,540</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, color: C.green, fontFamily: "Calibri, sans-serif", marginBottom: 20, fontWeight: "bold" }}>FORMATION CAMP — PER PERSON (75 PEOPLE)</div>
                {[
                  ["Venue / accommodation (3 nights)", "R600"],
                  ["Catering — all meals (3 days)", "R645"],
                  ["Transport (return)", "R140"],
                  ["Programme materials", "R80"],
                  ["Activities & team building", "R120"],
                  ["Sound / PA", "R47"],
                  ["Contingency (10%)", "R163"],
                ].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "Calibri, sans-serif", fontSize: 13 }}>
                    <span style={{ color: C.lgray }}>{l}</span>
                    <span style={{ color: "#5CB88A", fontWeight: "bold" }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontFamily: "Calibri, sans-serif", fontSize: 16, fontWeight: "bold" }}>
                  <span style={{ color: C.white }}>TOTAL CAMP</span>
                  <span style={{ color: "#5CB88A" }}>±R1,795</span>
                </div>
                <div style={{ background: C.dred, padding: "16px 20px", marginTop: 8 }}>
                  <div style={{ fontFamily: "Calibri, sans-serif", fontSize: 11, color: "#FFCCCC", marginBottom: 6 }}>ALL-IN PER PERSON PER YEAR</div>
                  <div style={{ fontSize: 28, color: C.white, fontWeight: "bold" }}>±R4,335</div>
                  <div style={{ fontFamily: "Calibri, sans-serif", fontSize: 11, color: "#FFCCCC", marginTop: 4 }}>Annual programme + Formation Camp</div>
                </div>
              </div>
            </div>
          )}

          {/* Banking */}
          <div style={{ marginTop: 48, background: C.dred, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FFCCCC", fontFamily: "Calibri, sans-serif", marginBottom: 8 }}>BANKING DETAILS</div>
              <div style={{ fontSize: 14, color: C.white, fontFamily: "Calibri, sans-serif", fontWeight: "bold" }}>
                FNB  ·  One6Teen Foundation NPC  ·  Account: <span style={{ color: "#FFD0CC" }}>63198917347</span>  ·  Current Account
              </div>
              <div style={{ fontSize: 12, color: "#FFCCCC", fontFamily: "Calibri, sans-serif", marginTop: 4 }}>Reference: Your name or company · NPC K2026049908</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#FFCCCC", fontFamily: "Calibri, sans-serif", marginBottom: 4 }}>Set a 1:16pm reminder daily.</div>
              <div style={{ fontSize: 11, color: "#FFCCCC", fontFamily: "Calibri, sans-serif" }}>Pray for the next generation.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 48px", background: C.dark }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>GET IN TOUCH</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "bold", color: C.white, margin: "0 0 20px" }}>Let's talk.</h2>
          <p style={{ fontSize: 15, color: C.gray, lineHeight: 1.8, fontFamily: "Calibri, sans-serif", marginBottom: 60, maxWidth: 560, margin: "0 auto 60px" }}>
            Whether you want to partner, volunteer, book the 116 Collective, open your school, or simply find out more — the door is always open.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { label: "EMAIL", value: "one6teenza@gmail.com", sub: "We respond within 24 hours" },
              { label: "PHONE", value: "062 789 4413", sub: "Mon–Fri, 8am–5pm" },
              { label: "SOCIAL", value: "Facebook: One6Teen", sub: "Follow & share the movement" },
            ].map((c, i) => (
              <div key={i} style={{ background: C.card, padding: "28px 24px", borderTop: `3px solid ${C.red}`, textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 4, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 12 }}>{c.label}</div>
                <div style={{ fontSize: 14, color: C.white, fontWeight: "bold", marginBottom: 8 }}>{c.value}</div>
                <div style={{ fontSize: 11, color: C.gray, fontFamily: "Calibri, sans-serif" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.black, padding: "32px", borderLeft: `4px solid ${C.red}`, textAlign: "left" }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: C.red, fontFamily: "Calibri, sans-serif", marginBottom: 16 }}>LOCATION</div>
            <div style={{ fontSize: 14, color: C.white, marginBottom: 8 }}>Pretoria, Gauteng — South Africa</div>
            <div style={{ fontSize: 13, color: C.gray, fontFamily: "Calibri, sans-serif", lineHeight: 1.7 }}>
              One6Teen operates primarily in Pretoria and the greater Gauteng area, with a vision to expand across South Africa and beyond. We travel to where young people are.
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: C.black, borderTop: `1px solid ${C.border}`, padding: "40px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: C.white, marginBottom: 4 }}>ONE6TEEN FOUNDATION</div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: C.red, fontFamily: "Calibri, sans-serif" }}>UNASHAMED  ·  ROMANS 1:16</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV.filter(n => n.id !== "home").map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 11, fontFamily: "Calibri, sans-serif", letterSpacing: 1, color: C.gray,
              }}>{n.label}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.mgray, fontFamily: "Calibri, sans-serif", textAlign: "right", lineHeight: 1.8 }}>
            NPC K2026049908<br />
            FNB · Acc: 63198917347<br />
            one6teen.com
          </div>
        </div>
      </footer>
    </div>
  );
}

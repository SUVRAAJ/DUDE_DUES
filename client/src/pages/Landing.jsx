import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        })
      },
      { threshold: 0.12 }
    )
    revealRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .dd-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .dd-root { font-family: 'DM Sans', sans-serif; background: #09090b; color: #fff; overflow-x: hidden; }

        .dd-nav { position: sticky; top: 0; z-index: 100; background: rgba(9,9,11,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; animation: dd-slideDown 0.5s ease both; }
        @keyframes dd-slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .dd-logo { font-size: 20px; font-weight: 700; color: #fff; }
        .dd-logo span { color: #818cf8; }
        .dd-nav-cta { background: #4f46e5; color: #fff; border: none; padding: 10px 20px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .dd-nav-cta:hover { background: #6366f1; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.4); }

        .dd-hero { min-height: 90vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 24px 40px; position: relative; overflow: hidden; }
        .dd-hero-glow { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%); pointer-events: none; animation: dd-glowPulse 4s ease-in-out infinite; }
        @keyframes dd-glowPulse { 0%,100% { opacity: 0.6; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.1); } }

        .dd-pill { position: absolute; border: 1px solid rgba(99,102,241,0.2); background: rgba(99,102,241,0.06); border-radius: 100px; font-size: 12px; color: #818cf8; padding: 6px 14px; white-space: nowrap; animation: dd-float 6s ease-in-out infinite; }
        .dd-pill-1 { top: 18%; left: 8%; animation-delay: 0s; }
        .dd-pill-2 { top: 30%; right: 6%; animation-delay: 1.5s; }
        .dd-pill-3 { bottom: 28%; left: 5%; animation-delay: 3s; }
        .dd-pill-4 { bottom: 22%; right: 8%; animation-delay: 0.8s; }
        @keyframes dd-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .dd-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); color: #a5b4fc; font-size: 13px; font-weight: 500; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; animation: dd-fadeDown 0.6s ease both; }
        .dd-badge-dot { width: 6px; height: 6px; background: #818cf8; border-radius: 50%; animation: dd-pulse 2s infinite; }
        @keyframes dd-pulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(129,140,248,0.4); } 50% { opacity: 0.6; box-shadow: 0 0 0 4px rgba(129,140,248,0); } }
        @keyframes dd-fadeDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dd-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dd-fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .dd-h1 { font-size: clamp(36px, 7vw, 72px); font-weight: 700; line-height: 1.1; margin-bottom: 20px; animation: dd-fadeUp 0.7s 0.15s ease both; }
        .dd-accent { color: #818cf8; position: relative; display: inline-block; }
        .dd-accent::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #818cf8, #a78bfa); border-radius: 2px; animation: dd-underline 0.8s 1s ease forwards; }
        @keyframes dd-underline { from { width: 0; } to { width: 100%; } }

        .dd-sub { font-size: clamp(16px, 2.5vw, 20px); color: #a1a1aa; max-width: 520px; line-height: 1.6; margin-bottom: 36px; animation: dd-fadeUp 0.7s 0.25s ease both; }
        .dd-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; animation: dd-fadeUp 0.7s 0.35s ease both; }
        .dd-btn-primary { background: #4f46e5; color: #fff; border: none; padding: 14px 28px; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
        .dd-btn-primary:hover { background: #6366f1; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.4); }
        .dd-btn-secondary { background: transparent; color: #a1a1aa; border: 1px solid rgba(255,255,255,0.1); padding: 14px 28px; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.2s; }
        .dd-btn-secondary:hover { color: #fff; border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.04); transform: translateY(-2px); }

        .dd-stats { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; margin-top: 56px; animation: dd-fadeIn 0.8s 0.6s ease both; }
        .dd-stat-num { font-size: 28px; font-weight: 700; color: #fff; }
        .dd-stat-label { font-size: 13px; color: #71717a; margin-top: 2px; }

        .dd-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .dd-reveal.visible { opacity: 1; transform: translateY(0); }
        .dd-d1 { transition-delay: 0.1s; } .dd-d2 { transition-delay: 0.2s; } .dd-d3 { transition-delay: 0.3s; }
        .dd-d4 { transition-delay: 0.4s; } .dd-d5 { transition-delay: 0.5s; } .dd-d6 { transition-delay: 0.6s; }

        .dd-section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
        .dd-section-label { font-size: 13px; font-weight: 600; color: #818cf8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .dd-section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 700; line-height: 1.2; margin-bottom: 16px; }
        .dd-section-sub { font-size: 17px; color: #a1a1aa; max-width: 520px; line-height: 1.6; margin-bottom: 48px; }

        .dd-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .dd-feature-card { background: #18181b; border: 1px solid #27272a; border-radius: 20px; padding: 28px; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; cursor: default; }
        .dd-feature-card:hover { border-color: rgba(99,102,241,0.5); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99,102,241,0.12); }
        .dd-feature-icon { width: 44px; height: 44px; background: rgba(99,102,241,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; transition: transform 0.3s; }
        .dd-feature-card:hover .dd-feature-icon { transform: scale(1.1) rotate(-4deg); }
        .dd-feature-title { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .dd-feature-desc { font-size: 14px; color: #71717a; line-height: 1.6; }

        .dd-algo-box { background: #18181b; border: 1px solid #27272a; border-radius: 24px; padding: 48px; max-width: 1100px; margin: 0 auto 80px; }
        .dd-algo-visual { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin: 40px 0; }
        .dd-person { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .dd-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; transition: transform 0.3s; }
        .dd-avatar:hover { transform: scale(1.1); }
        .dd-avatar-owes { background: rgba(239,68,68,0.15); color: #f87171; border: 2px solid rgba(239,68,68,0.3); }
        .dd-avatar-owed { background: rgba(34,197,94,0.15); color: #4ade80; border: 2px solid rgba(34,197,94,0.3); }
        .dd-person-label { font-size: 12px; color: #a1a1aa; }
        .dd-arrow { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .dd-arrow-line { height: 2px; width: 60px; background: linear-gradient(90deg, rgba(129,140,248,0.3), rgba(129,140,248,0.8)); border-radius: 2px; position: relative; overflow: hidden; }
        .dd-arrow-line::after { content: ''; position: absolute; left: -100%; top: 0; height: 100%; width: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: dd-shimmer 2s infinite; }
        @keyframes dd-shimmer { to { left: 200%; } }
        .dd-arrow-tip { color: #818cf8; font-size: 14px; }
        .dd-arrow-amount { font-size: 13px; color: #a5b4fc; font-weight: 500; }
        .dd-algo-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
        .dd-tag { display: inline-block; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: #a5b4fc; font-size: 13px; padding: 4px 12px; border-radius: 100px; transition: all 0.2s; cursor: default; }
        .dd-tag:hover { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.4); }

        .dd-how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
        .dd-step { padding: 28px; background: #18181b; border: 1px solid #27272a; border-radius: 20px; transition: all 0.3s; }
        .dd-step:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-3px); }
        .dd-step-num { font-size: 48px; font-weight: 700; color: rgba(99,102,241,0.2); line-height: 1; margin-bottom: 12px; transition: color 0.3s; }
        .dd-step:hover .dd-step-num { color: rgba(99,102,241,0.5); }
        .dd-step-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
        .dd-step-desc { font-size: 14px; color: #71717a; line-height: 1.5; }

        .dd-author { text-align: center; padding: 80px 24px; border-top: 1px solid #27272a; }
        .dd-author-avatar { width: 80px; height: 80px; border-radius: 50%; background: rgba(99,102,241,0.15); border: 2px solid rgba(99,102,241,0.3); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #818cf8; margin: 0 auto 20px; transition: all 0.3s; cursor: default; }
        .dd-author-avatar:hover { transform: scale(1.08); box-shadow: 0 0 30px rgba(99,102,241,0.3); }
        .dd-author-name { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .dd-author-bio { font-size: 15px; color: #71717a; max-width: 400px; margin: 0 auto 28px; line-height: 1.6; }
        .dd-author-links { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .dd-author-link { background: #27272a; color: #a1a1aa; border: 1px solid #3f3f46; padding: 10px 20px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .dd-author-link:hover { background: #3f3f46; color: #fff; transform: translateY(-2px); }
        .dd-author-link-primary { background: #4f46e5; border-color: #4f46e5; color: #fff; }
        .dd-author-link-primary:hover { background: #6366f1; box-shadow: 0 6px 20px rgba(99,102,241,0.35); }

        .dd-cta { text-align: center; padding: 80px 24px; }
        .dd-cta-card { background: #18181b; border: 1px solid rgba(99,102,241,0.2); border-radius: 28px; padding: 64px 40px; max-width: 640px; margin: 0 auto; position: relative; overflow: hidden; }
        .dd-cta-card::before { content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 400px; height: 300px; background: radial-gradient(ellipse, rgba(99,102,241,0.12), transparent 70%); pointer-events: none; }
        .dd-cta-card h2 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; margin-bottom: 16px; position: relative; }
        .dd-cta-card p { color: #a1a1aa; font-size: 17px; margin-bottom: 32px; line-height: 1.6; position: relative; }

        .dd-footer { border-top: 1px solid #27272a; padding: 28px 24px; text-align: center; color: #52525b; font-size: 13px; }
        .dd-footer span { color: #818cf8; }

        @media (max-width: 600px) {
          .dd-pill { display: none; }
          .dd-algo-box { padding: 28px 20px; }
          .dd-stats { gap: 24px; }
          .dd-cta-card { padding: 40px 24px; }
        }
      `}</style>

      <div className="dd-root">
        {/* Navbar */}
        <nav className="dd-nav">
          <div className="dd-logo">Dude<span>Dues</span></div>
          <button className="dd-nav-cta" onClick={() => navigate("/signup")}>Get Started Free</button>
        </nav>

        {/* Hero */}
        <section className="dd-hero">
          <div className="dd-hero-glow" />
          <div className="dd-pill dd-pill-1">✈️ Goa Trip · ₹12,400</div>
          <div className="dd-pill dd-pill-2">🍔 Dinner · ₹2,800</div>
          <div className="dd-pill dd-pill-3">🏠 Rent · ₹45,000</div>
          <div className="dd-pill dd-pill-4">✅ Settled · ₹3,200</div>

          <div className="dd-badge"><span className="dd-badge-dot" />Free forever · No credit card needed</div>
          <h1 className="dd-h1">Split bills.<br />Not <span className="dd-accent">friendships.</span></h1>
          <p className="dd-sub">Track group expenses, split costs fairly, and settle up with the minimum number of transactions possible.</p>
          <div className="dd-ctas">
            <button className="dd-btn-primary" onClick={() => navigate("/signup")}>Start for free</button>
            <button className="dd-btn-secondary" onClick={() => window.open("https://github.com/SUVRAAJ/DUDE_DUES", "_blank")}>View on GitHub</button>
          </div>
          <div className="dd-stats">
            <div><div className="dd-stat-num">₹0</div><div className="dd-stat-label">awkward conversations</div></div>
            <div><div className="dd-stat-num">100%</div><div className="dd-stat-label">friendships intact</div></div>
            <div><div className="dd-stat-num">n-1</div><div className="dd-stat-label">minimum settlements</div></div>
          </div>
        </section>

        {/* Features */}
        <div className="dd-section">
          <div className="dd-section-label dd-reveal" ref={addReveal}>Features</div>
          <h2 className="dd-section-title dd-reveal dd-d1" ref={addReveal}>Everything your group needs</h2>
          <p className="dd-section-sub dd-reveal dd-d2" ref={addReveal}>From adding expenses to settling up — DudeDues handles the math so you don't have to.</p>
          <div className="dd-features-grid">
            {[
              { icon: "🔐", title: "Secure Authentication", desc: "JWT-based auth with bcrypt password hashing. Your data stays yours." },
              { icon: "👥", title: "Group Management", desc: "Create groups, invite members by email, and manage expenses together in real time." },
              { icon: "🧮", title: "Smart Settlement", desc: "Our algorithm minimizes the number of transactions to settle a group — no unnecessary payments." },
              { icon: "📊", title: "Spending Breakdown", desc: "Visual pie charts show how your group spends across food, travel, rent, and more." },
              { icon: "💼", title: "Balance Overview", desc: "See your net balance across all groups in one place. Know exactly what you owe and are owed." },
              { icon: "✅", title: "Mark as Settled", desc: "Once you've paid, mark your split as settled. Everyone stays on the same page." },
            ].map((f, i) => (
              <div className={`dd-feature-card dd-reveal dd-d${i + 1}`} ref={addReveal} key={i}>
                <div className="dd-feature-icon">{f.icon}</div>
                <div className="dd-feature-title">{f.title}</div>
                <div className="dd-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm */}
        <div style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
          <div className="dd-algo-box dd-reveal" ref={addReveal}>
            <div className="dd-section-label">The Algorithm</div>
            <h2 className="dd-section-title">Minimum transactions. Always.</h2>
            <p className="dd-section-sub">In a group of n people, you could have up to n×(n-1)/2 payments. DudeDues reduces that to at most n-1.</p>
            <div className="dd-algo-visual">
              <div className="dd-person"><div className={`dd-avatar dd-avatar-owes`}>A</div><div className="dd-person-label">owes ₹300</div></div>
              <div className="dd-arrow"><div className="dd-arrow-line" /><div className="dd-arrow-tip">→</div><div className="dd-arrow-amount">₹300</div></div>
              <div className="dd-person"><div className={`dd-avatar dd-avatar-owed`}>B</div><div className="dd-person-label">gets ₹500</div></div>
              <div className="dd-arrow"><div className="dd-arrow-line" /><div className="dd-arrow-tip">→</div><div className="dd-arrow-amount">₹200</div></div>
              <div className="dd-person"><div className={`dd-avatar dd-avatar-owes`}>C</div><div className="dd-person-label">owes ₹200</div></div>
            </div>
            <div className="dd-algo-tags">
              {["Two-pointer approach", "O(n log n)", "Net balance calculation"].map((t) => (
                <span className="dd-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="dd-section">
          <div className="dd-section-label dd-reveal" ref={addReveal}>How it works</div>
          <h2 className="dd-section-title dd-reveal dd-d1" ref={addReveal}>Up and running in minutes</h2>
          <p className="dd-section-sub dd-reveal dd-d2" ref={addReveal}>No setup headaches. Just sign up and start splitting.</p>
          <div className="dd-how-grid">
            {[
              { num: "01", title: "Create an account", desc: "Sign up in seconds. No credit card required." },
              { num: "02", title: "Create a group", desc: "Name your group and invite friends by email." },
              { num: "03", title: "Add expenses", desc: "Log what you paid, pick a category, splits are calculated automatically." },
              { num: "04", title: "Settle up", desc: "See exactly who pays whom with the minimum number of transactions." },
            ].map((s, i) => (
              <div className={`dd-step dd-reveal dd-d${i + 1}`} ref={addReveal} key={i}>
                <div className="dd-step-num">{s.num}</div>
                <div className="dd-step-title">{s.title}</div>
                <div className="dd-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <section className="dd-author dd-reveal" ref={addReveal}>
          <div className="dd-author-avatar">S</div>
          <div className="dd-author-name">Suvraaj Nandwani</div>
          <div className="dd-author-bio">3rd year CS student. Built DudeDues end-to-end — backend, frontend, deployment, and the settlement algorithm.</div>
          <div className="dd-author-links">
            <button className={`dd-author-link dd-author-link-primary`} onClick={() => navigate("/signup")}>Live App</button>
            <button className="dd-author-link" onClick={() => window.open("https://github.com/SUVRAAJ/DUDE_DUES", "_blank")}>GitHub</button>
          </div>
        </section>

        {/* CTA */}
        <section className="dd-cta dd-reveal" ref={addReveal}>
          <div className="dd-cta-card">
            <h2>Ready to split smarter?</h2>
            <p>Join for free and never have an awkward money conversation again.</p>
            <button className="dd-btn-primary" style={{ fontSize: 17, padding: "16px 36px" }} onClick={() => navigate("/signup")}>
              Get started for free
            </button>
          </div>
        </section>

        <footer className="dd-footer">
          Built with ♥ by <span>Suvraaj Nandwani</span> · DudeDues © 2026
        </footer>
      </div>
    </>
  )
}

export default Landing
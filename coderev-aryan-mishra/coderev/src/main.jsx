import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const pages = ['/', '/about', '/contact'];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function MatrixBackground() {
  return <div className="matrix" aria-hidden="true"><div className="matrix-grid" /></div>;
}

function Navbar({ path }) {
  const items = [
    ['/', 'HOME'],
    ['/about', 'ABOUT'],
    ['/contact', 'CONTACT']
  ];
  return (
    <header className="navbar">
      <button className="brand" onClick={() => navigate('/')} aria-label="Coderev home">
        Coderev
      </button>
      <nav className="navlinks">
        {items.map(([href, label]) => (
          <button key={href} className={path === href ? 'active' : ''} onClick={() => navigate(href)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function PageShell({ path, children }) {
  return (
    <div className="site">
      <Navbar path={path} />
      <MatrixBackground />
      <main className="page">{children}</main>
      <footer>© {new Date().getFullYear()} Coderev · Built by <strong>Aryan Mishra</strong></footer>
    </div>
  );
}

function Home() {
  return (
    <section className="hero page-enter">
      <div className="hero-copy">
        <p className="eyebrow">CODE • REVIEW • IMPROVE</p>
        <h1>Code smarter.<br /><span>Build better.</span></h1>
        <p className="hero-text">
          Coderev is a modern code-review platform for students learning programming,
          Data Structures and Algorithms. Write code, understand it, and refine it.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => navigate('/contact')}>Get Started <span>→</span></button>
          <button className="secondary" onClick={() => navigate('/about')}>Explore Coderev</button>
        </div>
      </div>
      <div className="code-window float">
        <div className="window-top"><i></i><i></i><i></i><span>review.cpp</span></div>
        <pre><code>{`#include <iostream>\n\nint main() {\n    int score = 100;\n    std::cout << "Keep coding!";\n    return 0;\n}`}</code></pre>
        <div className="scanline" />
      </div>
      <div className="glow-orb orb-one" /><div className="glow-orb orb-two" />
    </section>
  );
}

function About() {
  return (
    <section className="about page-enter">
      <h1>About Us</h1>
      <div className="about-panel">
        <p className="intro">Welcome to our digital realm. We create immersive experiences that blend technology with art.</p>
        <p><strong>Coderev</strong> — built with <strong>React + Vite</strong> by <strong>Aryan Mishra</strong> — is a modern platform crafted for students passionate about coding and Data Structures &amp; Algorithms (DSA).</p>
        <p>It empowers learners to <strong>analyze, review, and refine</strong> their code efficiently, blending intelligent design with an intuitive user experience.</p>
        <p>Coderev isn't just a tool — it's your <strong>personal code reviewer</strong> for mastering problem-solving and writing cleaner, optimized solutions.</p>
        <div className="cards">
          <Feature icon="⚡" title="Innovation" text="Pushing boundaries with cutting-edge technology." />
          <Feature icon="🎨" title="Design" text="Crafting beautiful, immersive digital experiences." />
          <Feature icon="🚀" title="Performance" text="Optimized for speed and smooth interaction." />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return <article className="feature"><div className="feature-icon">{icon}</div><h2>{title}</h2><p>{text}</p></article>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e) { e.preventDefault(); setSent(true); }
  return (
    <section className="contact page-enter">
      <div className="contact-heading">
        <p className="eyebrow">LET'S CONNECT</p>
        <h1>Contact <span>Us</span></h1>
        <p>Have a question, idea, or feedback about Coderev? Send a message.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-card"><span>✉</span><div><small>EMAIL</small><strong>aryan.mishra@coderev.dev</strong></div></div>
          <div className="info-card"><span>⌘</span><div><small>CREATOR</small><strong>Aryan Mishra</strong></div></div>
          <div className="info-card"><span>⚡</span><div><small>PROJECT</small><strong>Coderev · DSA Code Review</strong></div></div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>Name<input required placeholder="Your name" /></label>
          <label>Email<input required type="email" placeholder="you@example.com" /></label>
          <label>Message<textarea required rows="6" placeholder="Write your message..."></textarea></label>
          <button className="primary" type="submit">Send Message <span>→</span></button>
          {sent && <p className="success">Message ready to send — thanks for reaching out!</p>}
        </form>
      </div>
    </section>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const content = path === '/about' ? <About /> : path === '/contact' ? <Contact /> : <Home />;
  return <PageShell path={path}>{content}</PageShell>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

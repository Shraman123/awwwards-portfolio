"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MoveRight, Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react";
import { submitContact } from "./actions/contact";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await submitContact(formData);
    if (res?.success) {
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } else {
      setFormStatus("error");
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Loading Animation & Hero Reveal
    const tl = gsap.timeline();
    tl.to(".loader-text", { opacity: 1, duration: 0.5 })
      .to(".loader-text", { opacity: 0, duration: 0.5, delay: 0.5 })
      .to(".loader-overlay", { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
      .fromTo(
        ".hero-line span",
        { y: 150, skewY: 10, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power4.out" },
        "-=0.5"
      );

    // Fade up sections
    gsap.utils.toArray(".fade-up").forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });

    // Horizontal Scroll for Projects
    if (projectsContainerRef.current) {
      const projects = gsap.utils.toArray(".project-card");
      gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: projectsContainerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (projects.length - 1),
          end: () => "+=" + projectsContainerRef.current?.offsetWidth,
        }
      });
    }
  }, []);

  return (
    <main className="relative w-full text-[#dae2fd]">
      
      {/* Loading Overlay */}
      <div className="loader-overlay fixed inset-0 z-[999] bg-[#0b1326] flex items-center justify-center">
        <span className="loader-text opacity-0 text-[#afc6ff] font-mono tracking-[0.5em] text-sm uppercase">Loading Experience</span>
      </div>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative px-6 z-10">
        <h1 className="text-5xl md:text-[6vw] font-bold leading-[1.1] tracking-tighter text-center max-w-5xl">
          <div className="overflow-hidden hero-line pb-2"><span className="inline-block hover:italic transition-all duration-300">BUILDING THE FUTURE</span></div>
          <div className="overflow-hidden hero-line pb-2"><span className="inline-block text-[#afc6ff] italic">WITH AI & STARTUPS</span></div>
        </h1>
        <div className="overflow-hidden hero-line mt-6">
          <span className="inline-block text-lg md:text-2xl text-white/70 font-mono text-center">
            AI Engineer <span className="text-[#afc6ff]">|</span> Product Builder <span className="text-[#afc6ff]">|</span> Future Founder
          </span>
        </div>
        
        <div className="mt-12 flex gap-6 hero-line overflow-hidden">
          <span className="inline-block">
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="magnetic bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-all">
              View Work
            </button>
          </span>
          <span className="inline-block">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="magnetic bg-[#afc6ff] text-[#0b1326] px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(175,198,255,0.3)]">
              Contact Me
            </button>
          </span>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50">
          <ChevronDown className="animate-bounce" />
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 relative z-10 bg-[#0b1326]/50 backdrop-blur-3xl pt-24 pb-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto fade-up">
          <span className="text-[#afc6ff] font-mono text-sm uppercase tracking-widest block mb-4">01. About Me</span>
          <h2 className="text-3xl md:text-5xl font-medium leading-relaxed text-[#c2c6d8]">
            I am <span className="text-white font-bold">Shraman Hazra</span>. A 22-year-old AI Engineer and ambitious builder. 
            I operate at the intersection of <span className="italic text-[#afc6ff]">machine learning, product strategy, and venture creation.</span>
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl border-t border-[#afc6ff]/30 group hover:-translate-y-2 transition-transform duration-500 magnetic">
              <h3 className="text-xl font-bold mb-4">Discipline</h3>
              <p className="text-sm opacity-60 leading-loose">Rooted in daily yoga practice, I approach complex engineering problems and startup building with extreme clarity, focus, and resilience.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t border-white/20 group hover:-translate-y-2 transition-transform duration-500 delay-100 magnetic">
              <h3 className="text-xl font-bold mb-4">Curiosity</h3>
              <p className="text-sm opacity-60 leading-loose">From acting to global travel, exploring diverse human experiences fuels my creativity in developing premium, user-centric AI products.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t border-[#afc6ff]/30 group hover:-translate-y-2 transition-transform duration-500 delay-200 magnetic">
              <h3 className="text-xl font-bold mb-4">Execution</h3>
              <p className="text-sm opacity-60 leading-loose">Ideas are cheap. I pride myself on rapid MVP development, deep technical implementation, and relentlessly pushing products to market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section className="py-32 px-6 relative z-10 bg-[#0b1326]">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#afc6ff] font-mono text-sm uppercase tracking-widest block mb-12 fade-up">02. Experience</span>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            
            {/* Experience 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group fade-up">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0b1326] text-[#afc6ff] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-[#afc6ff] rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(175,198,255,1)]"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl hover:border-[#afc6ff]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">AI Engineer</h3>
                  <span className="font-mono text-xs text-[#afc6ff]">Current</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">Developing and deploying large scale machine learning models, optimizing inference architecture, and integrating LLMs into core business products.</p>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group fade-up">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0b1326] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl hover:border-white/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">Product Intern</h3>
                  <span className="font-mono text-xs opacity-50">@ Forruppo</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">Drove product strategy, managed feature roadmaps, and bridged the gap between engineering execution and user-centric design.</p>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group fade-up">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0b1326] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl hover:border-white/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">Teacher</h3>
                  <span className="font-mono text-xs opacity-50">NGO</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">Mentoring tech clubs and teaching underprivileged students. Empowering the next generation of builders through impact-focused execution.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" ref={projectsContainerRef} className="h-screen flex items-center bg-[#0b1326]/80 backdrop-blur-3xl relative z-10 overflow-hidden border-t border-white/5">
        <div className="absolute top-12 left-12 z-20 fade-up">
          <span className="text-[#afc6ff] font-mono text-sm uppercase tracking-widest block mb-2">03. Selected Works</span>
          <h2 className="text-3xl font-bold">Projects</h2>
        </div>
        <div className="flex w-[300vw] h-full items-center">
          
          {/* Project 1 */}
          <div className="project-card w-screen h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-12">
            <div className="w-full max-w-6xl mx-auto h-full glass-card rounded-3xl overflow-hidden relative group flex flex-col md:flex-row border border-white/10 hover:border-[#afc6ff]/50 transition-colors duration-500 hover:shadow-[0_0_50px_rgba(175,198,255,0.1)]">
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-[#131b2e] to-[#0b1326] p-12 flex flex-col justify-center z-20">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">OpenAI Agents Python</h3>
                <div className="space-y-4 mb-8">
                  <p><span className="text-[#afc6ff] font-bold">Problem:</span> Complexity in orchestrating multi-agent systems efficiently.</p>
                  <p><span className="text-[#afc6ff] font-bold">Outcome:</span> A lightweight, highly extensible open-source framework for building agentic workflows natively in Python.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'LLMs', 'OpenAI API', 'Framework Design'].map(t => (
                    <span key={t} className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase bg-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/50">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 mix-blend-screen"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b1326]/90 hidden md:block"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
                  <a href="https://github.com/Shraman123/openai-agents-python" target="_blank" className="magnetic flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">View Source <ExternalLink size={16}/></a>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card w-screen h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-12">
            <div className="w-full max-w-6xl mx-auto h-full glass-card rounded-3xl overflow-hidden relative group flex flex-col md:flex-row border border-white/10 hover:border-[#ddb7ff]/50 transition-colors duration-500 hover:shadow-[0_0_50px_rgba(221,183,255,0.1)]">
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-[#1b132e] to-[#0b1326] p-12 flex flex-col justify-center z-20">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Fintech Inference Engine</h3>
                <div className="space-y-4 mb-8">
                  <p><span className="text-[#ddb7ff] font-bold">Problem:</span> High latency during real-time fraud detection and risk assessment.</p>
                  <p><span className="text-[#ddb7ff] font-bold">Outcome:</span> Built a scalable ML inference pipeline reducing latency by 40% allowing real-time transaction blocking.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['PyTorch', 'FastAPI', 'MLOps', 'AWS'].map(t => (
                    <span key={t} className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase bg-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/50">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b1326]/90 hidden md:block"></div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card w-screen h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-12">
            <div className="w-full max-w-6xl mx-auto h-full glass-card rounded-3xl overflow-hidden relative group flex flex-col md:flex-row border border-white/10 hover:border-white/50 transition-colors duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-[#222] to-[#0b1326] p-12 flex flex-col justify-center z-20">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">SaaS Analytics Dashboard</h3>
                <div className="space-y-4 mb-8">
                  <p><span className="text-white font-bold">Problem:</span> Founders lacking clear visibility into subscription churn mechanics.</p>
                  <p><span className="text-white font-bold">Outcome:</span> A premium Next.js dashboard processing millions of data points to generate actionable founder-led insights.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'React', 'Tailwind', 'PostgreSQL'].map(t => (
                    <span key={t} className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase bg-white/5">{t}</span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/50">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b1326]/90 hidden md:block"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SKILLS SECTION */}
      <section className="py-32 px-6 relative z-10 bg-[#0b1326]/90 backdrop-blur-3xl border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="text-[#afc6ff] font-mono text-sm uppercase tracking-widest block mb-12 fade-up">04. Arsenal</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Category: AI */}
            <div className="glass-card p-8 rounded-2xl fade-up border-t border-t-[#afc6ff]/50 magnetic">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">AI & ML</h3>
              <ul className="space-y-4 font-mono text-sm opacity-80">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> Deep Learning</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> LLMs</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> Computer Vision</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> NLP</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> MLOps</li>
              </ul>
            </div>

            {/* Category: Development */}
            <div className="glass-card p-8 rounded-2xl fade-up border-t border-t-white/30 delay-100 magnetic">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Development</h3>
              <ul className="space-y-4 font-mono text-sm opacity-80">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Python & C++</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> TypeScript</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Next.js & React</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Node.js</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Tailwind CSS</li>
              </ul>
            </div>

            {/* Category: Product */}
            <div className="glass-card p-8 rounded-2xl fade-up border-t border-t-[#afc6ff]/50 delay-200 magnetic">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Product</h3>
              <ul className="space-y-4 font-mono text-sm opacity-80">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> Product Strategy</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> UI/UX Thinking</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> MVP Scoping</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> User Research</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#afc6ff] bg-[#afc6ff]"></div> Agile/Scrum</li>
              </ul>
            </div>

            {/* Category: Startup */}
            <div className="glass-card p-8 rounded-2xl fade-up border-t border-t-white/30 delay-300 magnetic">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Venture</h3>
              <ul className="space-y-4 font-mono text-sm opacity-80">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Growth Thinking</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> SaaS Modelling</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Problem Solving</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> DSA</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_white] bg-white"></div> Execution Speed</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VISION SECTION */}
      <section className="py-40 px-6 relative z-10 bg-[#afc6ff] text-[#0b1326] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto relative z-10 fade-up">
          <span className="font-mono text-sm uppercase tracking-widest block mb-4 mix-blend-difference text-white/50">05. The Goal</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Building <span className="italic font-light">100 Cr+</span> Impact Startups.
          </h2>
          <p className="text-xl md:text-2xl font-medium opacity-80 leading-relaxed max-w-2xl mx-auto mix-blend-difference text-white/50">
            I don't just write code; I architect scale. My vision is to forge high-growth AI products that solve fundamental problems, drive massive innovation, and redefine industries on a global stage.
          </p>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 relative z-10 bg-[#0b1326] pb-12 pt-32">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
          
          <div className="w-full md:w-1/2 fade-up">
            <span className="text-[#afc6ff] font-mono text-sm uppercase tracking-widest block mb-6">06. Connect</span>
            <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none mb-6 text-white magnetic w-max">
              Let's<br/>Talk.
            </h2>
            <p className="text-lg opacity-60 mb-12 max-w-md">
              Whether you're a VC, a founder looking for a technical partner, or just want to chat about AI & startups—drop me a line.
            </p>
            <div className="flex flex-col gap-6">
              <a href="mailto:hazrashraman875@gmail.com" className="magnetic flex items-center gap-4 text-xl hover:text-[#afc6ff] transition-colors w-max">
                <Mail /> hazrashraman875@gmail.com
              </a>
              <a href="https://github.com/Shraman123" target="_blank" className="magnetic flex items-center gap-4 text-xl hover:text-[#afc6ff] transition-colors w-max">
                <Github /> github.com/Shraman123
              </a>
              <a href="https://linkedin.com/in/shraman-hazra" target="_blank" className="magnetic flex items-center gap-4 text-xl hover:text-[#afc6ff] transition-colors w-max">
                <Linkedin /> LinkedIn
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 fade-up">
            <form className="glass-card p-10 rounded-3xl flex flex-col gap-6 relative overflow-hidden" onSubmit={handleContactSubmit}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#afc6ff]/10 rounded-full blur-[50px]"></div>
              <div className="flex flex-col gap-2 relative z-10">
                <label className="text-xs uppercase tracking-widest font-mono opacity-60">Name</label>
                <input name="name" required type="text" className="bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#afc6ff] transition-colors text-white" placeholder="John Founders" />
              </div>
              <div className="flex flex-col gap-2 mt-4 relative z-10">
                <label className="text-xs uppercase tracking-widest font-mono opacity-60">Email</label>
                <input name="email" required type="email" className="bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#afc6ff] transition-colors text-white" placeholder="john@vc.com" />
              </div>
              <div className="flex flex-col gap-2 mt-4 relative z-10">
                <label className="text-xs uppercase tracking-widest font-mono opacity-60">Message</label>
                <textarea name="message" required rows={4} className="bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#afc6ff] transition-colors text-white resize-none" placeholder="Let's build something massive..."></textarea>
              </div>
              <button disabled={formStatus === "loading"} type="submit" className="magnetic mt-8 bg-white text-black font-bold uppercase tracking-widest py-4 rounded-full hover:bg-[#afc6ff] transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10 disabled:opacity-50 disabled:scale-100">
                {formStatus === "loading" ? "Sending..." : formStatus === "success" ? "Message Sent!" : formStatus === "error" ? "Error, Try Again" : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-xs font-mono uppercase tracking-widest opacity-40 bg-[#0b1326] relative z-10">
        © {new Date().getFullYear()} Shraman Hazra. Engineered for Scale.
      </footer>
    </main>
  );
}

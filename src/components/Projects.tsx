"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Listn.",
    description: "Premium, minimalistic ad-free music web app (PWA supported). Features custom user profiles, liked songs, dynamic playlists, and local uploads.",
    tech: "React, Jio Saavn API, Cloudflare R2 CDN, Tailwind",
    link: "https://listn.onrender.com/",
    type: "Web Application"
  },
  {
    title: "Mate.",
    description: "A premium chess platform against Stockfish bots (900-2800 ELO). Includes a multi-format ELO counter and an advanced Board Analysis tool.",
    tech: "React, Stockfish Engine",
    link: "https://mate-3x85.onrender.com/",
    type: "Web Application"
  },
  {
    title: "Robotic Tourist System",
    description: "Led a team to build an ESP32-based prototype using IR/Ultrasonic sensors and motors to automate path-following. Includes a web admin interface.",
    tech: "ESP32, C++, Hardware Sensors, IoT",
    link: "#",
    type: "Hardware & IoT"
  },
  {
    title: "DesignDotIn",
    description: "Founded a web design startup. Architected and deployed highly optimized, responsive interfaces for Clothing, Food, Medical, and Travel sectors.",
    tech: "HTML, CSS, JavaScript",
    link: "https://designdotin.netlify.app/",
    type: "Startup / Agency"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Reveal header
    gsap.from(".proj-header", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // 3D Card stacking effect
    const cards = gsap.utils.toArray(".proj-card");
    cards.forEach((card: any, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        rotationX: 30, // 3D rotation flip up
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-transparent text-black dark:text-white" style={{ perspective: 1000 }}>
      <div className="max-w-5xl mx-auto">
        <div className="proj-header mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 drop-shadow-lg">Selected Work.</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl drop-shadow-sm">A collection of my best projects, ranging from premium web applications to IoT hardware solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              href={project.link !== "#" ? project.link : undefined}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              className="proj-card group relative block p-6 md:p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-white/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors overflow-hidden shadow-sm will-change-transform"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-600 dark:text-gray-400">{project.type}</span>
                {project.link !== "#" && (
                  <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <ArrowUpRight size={20} />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">{project.description}</p>
              <p className="text-sm font-medium text-black dark:text-white">{project.tech}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

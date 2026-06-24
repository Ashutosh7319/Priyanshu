"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", 
  "React.js", "Next.js", "Tailwind CSS", "Three.js", "Angular.js",
  "Node.js", "MySQL", "MongoDB", "Pandas", "Git"
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 3D Entrance for Skills
    gsap.from(".skill-item", {
      opacity: 0,
      scale: 0.5,
      z: -100, // 3D z-axis translation
      rotationX: 45,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 1,
      }
    });

    // Fade out when scrolling past
    gsap.to(containerRef.current, {
      opacity: 0.2,
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-transparent text-black dark:text-white" style={{ perspective: 800 }}>
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className="skill-item text-3xl md:text-5xl font-bold tracking-tighter mb-16 drop-shadow-lg">
          Technical Arsenal.
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {skills.map((skill) => (
            <div
              key={skill}
              className="skill-item px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 shadow-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default"
            >
              <span className="font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

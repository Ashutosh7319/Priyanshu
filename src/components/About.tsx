"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".timeline-item");
    items.forEach((item: any, i) => {
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        rotationY: i % 2 === 0 ? 45 : -45, // 3D rotate
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-transparent text-black dark:text-white" style={{ perspective: 1200 }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 bg-white/90 dark:bg-black/80 p-6 md:p-12 rounded-3xl border border-white/40 dark:border-zinc-800/40 shadow-sm">
        
        {/* Education */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase text-gray-500 drop-shadow-md">Education</h2>
          <div className="space-y-8">
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">B.Tech Computer Science</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Sister Nivedita University | 2022 - 2026</p>
              <p className="text-sm font-medium">CGPA: 7.82 | Last SGPA: 10.0</p>
            </div>
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-gray-400 dark:bg-zinc-600 rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">Class 12th (Pure Science)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Techno India Group Public School | 2022</p>
              <p className="text-sm font-medium">CBSE Percentage: 78.4%</p>
            </div>
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-gray-400 dark:bg-zinc-600 rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">Class 10th</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Don Bosco School, Siliguri | 2020</p>
              <p className="text-sm font-medium">ICSE Percentage: 80.6%</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-8 uppercase text-gray-500 drop-shadow-md">Experience & Achievements</h2>
          <div className="space-y-8">
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">Web Development Intern</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">CipherByte Technologies</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">Completed a hands-on internship focusing on building and optimizing functional web applications.</p>
            </div>
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">2nd Place Winner</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Sparkhack (Jadavpur University)</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">Secured 2nd position among 10 highly competitive participating teams in the technical hackathon.</p>
            </div>
            <div className="timeline-item relative pl-6 border-l-2 border-black/20 dark:border-white/20">
              <div className="absolute w-3 h-3 bg-gray-400 dark:bg-zinc-600 rounded-full -left-[7px] top-1.5 shadow-md"></div>
              <h3 className="text-xl font-bold">Participant</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Hack-Ur-Way (Techno Main)</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">Developed and successfully pitched innovative technology solutions during an intensive hackathon.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

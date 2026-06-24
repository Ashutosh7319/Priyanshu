"use client";

import { useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Advanced 3D scroll effect for the Hero section fading out as we scroll down
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Initial load animation for text
    gsap.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Creating Experience: Image transforms and fades into the 3D scene
    const tl = gsap.timeline({ delay: 1.5 });
    tl.to(".hero-image", { filter: "grayscale(100%)", duration: 1, ease: "power1.inOut" })
      .to(".hero-image-wrapper", { opacity: 0, scale: 0.5, filter: "blur(10px)", duration: 1.5, ease: "power2.inOut" }, "+=0.5")
      .set(".hero-image-wrapper", { display: "none" });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center items-center relative px-6 md:px-12 py-20 overflow-hidden bg-transparent" style={{ perspective: 1000 }}>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6" style={{ perspective: 1000 }}>
          <div className="space-y-2">
            <h2 className="hero-text text-sm md:text-base font-semibold tracking-widest uppercase text-gray-600 dark:text-gray-400">
              Web Developer & Software Engineer
            </h2>
            <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-tight drop-shadow-xl">
              Priyanshu <br className="hidden md:block" /> Saha.
            </h1>
          </div>
          
          <p className="hero-text text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md drop-shadow-md">
            I craft minimalistic, high-performance digital experiences and build robust software solutions.
          </p>

          <div className="hero-text flex flex-wrap gap-4 mt-4">
            <a href="#contact" className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform">
              Contact Me <ArrowRight size={18} />
            </a>
            <a href="/cv.pdf" download className="px-6 py-3 border border-black dark:border-white text-black dark:text-white rounded-full font-medium flex items-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all bg-white/80 dark:bg-black/80">
              Download CV <Download size={18} />
            </a>
          </div>
        </div>

        <div className="hero-text hero-image-wrapper relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-gray-300/50 dark:border-zinc-700/50 group transition-transform duration-700 hover:-translate-y-2 will-change-transform">
          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-80 pointer-events-none"></div>
          
          <Image 
            src="/priyanshu.png" 
            alt="Priyanshu Saha" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="hero-image object-cover z-0" 
            priority
          />
        </div>
      </div>
    </section>
  );
}

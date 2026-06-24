"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Scene from "@/components/Scene";
import { useEffect } from "react";

export default function Home() {
  // Ensure we start at top to avoid weird scroll jumps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full relative bg-transparent">
      <Scene />
      
      <div className="relative z-10 w-full">
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
        
        {/* Minimal Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-black/80 border-t border-gray-200/20 dark:border-zinc-900/50">
          <p>© {new Date().getFullYear()} Priyanshu Saha. Crafted with precision.</p>
        </footer>
      </div>
    </main>
  );
}

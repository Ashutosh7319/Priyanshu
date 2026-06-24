"use client";

import { useState, useRef } from "react";
import { Mail, Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-elem", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotationX: 20,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    if (!serviceId || !templateId || !publicKey) {
      alert("EmailJS is not configured. Please set the environment variables.");
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey)
      .then(() => {
          setIsSuccess(true);
          setIsSubmitting(false);
          (e.target as HTMLFormElement).reset();
          setTimeout(() => setIsSuccess(false), 5000);
      }, (error) => {
          alert("Failed to send message via EmailJS (keys needed). However, you can still reach me directly at priyanshuwork72@gmail.com!");
          setIsSubmitting(false);
      });
  };

  return (
    <section ref={containerRef} id="contact" className="py-32 px-6 md:px-12 bg-transparent text-black dark:text-white" style={{ perspective: 1000 }}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 bg-white/90 dark:bg-zinc-900/90 p-6 md:p-12 rounded-3xl md:rounded-[3rem] border border-white/50 dark:border-zinc-700/50 shadow-sm">
        
        <div className="flex-1 contact-elem">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 md:mb-6 drop-shadow-md">Let's Connect.</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 md:mb-12 drop-shadow-sm">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>

          <div className="space-y-6">
            <a href="mailto:priyanshuwork72@gmail.com" className="flex items-center gap-3 md:gap-4 text-base md:text-lg font-medium hover:text-gray-500 transition-colors break-all">
              <div className="min-w-10 min-h-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center shadow-md shrink-0">
                <Mail size={20} />
              </div>
              priyanshuwork72@gmail.com
            </a>
            <a href="https://github.com/Ashutosh7319" target="_blank" rel="noreferrer" className="flex items-center gap-3 md:gap-4 text-base md:text-lg font-medium hover:text-gray-500 transition-colors break-all">
              <div className="min-w-10 min-h-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center shadow-md shrink-0">
                <GithubIcon size={20} />
              </div>
              github.com/Ashutosh7319
            </a>
            <a href="https://linkedin.com/in/priyanshu-saha" target="_blank" rel="noreferrer" className="flex items-center gap-3 md:gap-4 text-base md:text-lg font-medium hover:text-gray-500 transition-colors break-all">
              <div className="min-w-10 min-h-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center shadow-md shrink-0">
                <LinkedinIcon size={20} />
              </div>
              linkedin.com/in/priyanshu-saha
            </a>
          </div>
        </div>

        <div className="flex-1 contact-elem">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Name</label>
              <input 
                type="text" 
                name="user_name"
                id="name" 
                required
                className="w-full bg-white/90 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-inner"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Email</label>
              <input 
                type="email" 
                name="user_email"
                id="email" 
                required
                className="w-full bg-white/90 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-inner"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Message</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={4}
                className="w-full bg-white/90 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none shadow-inner"
                placeholder="Hello..."
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70 shadow-lg"
            >
              {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : <><Send size={18} /> Send Message</>}
            </button>
            {isSuccess && <p className="text-sm text-green-600 dark:text-green-400 text-center font-medium drop-shadow-sm">Thank you! I will get back to you soon.</p>}
          </form>
        </div>

      </div>
    </section>
  );
}

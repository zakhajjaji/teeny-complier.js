"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import PixelBlast from "./ui/pixel-blast";

function HoverButton({ text, isPrimary }: { text: string; isPrimary: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const springConfig = { damping: 30, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    x.set(mouseX);
    width.set(rect.width);
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative px-0 py-3 font-medium text-lg overflow-visible ${
        isPrimary ? "text-foreground" : "text-foreground/60 hover:text-foreground"
      } transition-colors`}
    >
      {text}
      {isHovered && (
        <motion.div
          className="absolute bottom-0 h-0.5 bg-foreground"
          style={{
            left: xSpring,
            width: width,
            x: "-50%",
          }}
          initial={{ width: 0 }}
          animate={{ width: width.get() }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </button>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-45">
        <PixelBlast />
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[120px] leading-[0.9] font-foreground tracking-[-0.02em] text-foreground mb-8"
            >
              Build a
              <br />
              Compiler.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-foreground/70 mb-12 max-w-xl font-light"
            >
              Transpile Teeny language to <span className="font-bold">JavaScript</span> and see tokenisation, parsing, and code generation in action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-8"
            >
              <HoverButton text="Start compiling" isPrimary />
              <HoverButton text="View docs" isPrimary={false} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

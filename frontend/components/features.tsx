"use client";

import { useState } from "react";
import PixelBlast from "./ui/pixel-blast";

export default function Features() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section
      id="features"
      className="relative overflow-hidden py-16"
    >
      <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
        <PixelBlast />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left flex items-start justify-between gap-6 mb-6 border-border/60 pt-4"
            aria-expanded={isOpen}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                Features
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                A bold, interactive compiler playground: see tokenisation, parsing (AST) and
                code generation in action.
              </p>
            </div>
            <span className="text-muted-foreground font-mono text-lg pt-1">
              {isOpen ? "▼" : "▶"}
            </span>
          </button>

          {isOpen && (
            <div className="border-border/60 pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Teeny editor UX",
                    desc: "Line numbers and basic Teeny syntax highlighting for faster reading.",
                  },
                  {
                    title: "Tokeniser output",
                    desc: "Tokens are displayed with type, value, and source location (line/column).",
                  },
                  {
                    title: "AST tree",
                    desc: "Visualise the parser result as an interactive tree (expand/collapse).",
                  },
                  {
                    title: "Generated JavaScript",
                    desc: "View the transpiled code with basic highlighting and copy-to-clipboard.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border-l-2 border-primary/30 pl-4">
                    <div className="font-semibold text-foreground mb-1">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 font-mono text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">Pipeline:</span>{" "}
                Teeny source → Tokens → AST → JavaScript output
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
'use client';

import Link from 'next/link';
import { docsIndex } from '@/lib/docs';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background" id="docs">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Teeny Compiler Docs
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn how the Teeny language compiles to JavaScript and how to use the
            interactive playground.
          </p>
        </header>

        <section className="space-y-4">
          {docsIndex.map((section) => (
            <Link
              key={section.id}
              href={`/docs/${section.id}`}
              className="block rounded-md border border-border/60 bg-muted/20 p-4 hover:bg-muted/40 transition-colors"
            >
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-sm">{section.description}</p>
              <p className="mt-2 text-xs text-primary font-medium">Read more →</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}


import { notFound } from 'next/navigation';
import { docs, type DocSectionId } from '@/lib/docs';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function renderStep(step: string | { title: string; items: string[]; description: string; sampleProgram: string; panels: { name: string; description: string; bullets: string[] }[]; suggestions: string[] }) {
  if (typeof step === 'string') {
    return <p key={step}>{step}</p>;
  }

  const stepData = step as { title: string; items: string[]; description: string; sampleProgram: string; panels: { name: string; description: string; bullets: string[] }[]; suggestions: string[] };

  return (
    <div key={stepData.title} className="mt-6">
      <h2 className="text-lg font-semibold mb-2">{stepData.title}</h2>

      {stepData.items && (
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          {stepData.items.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {stepData.description && <p className="text-muted-foreground mb-2">{stepData.description}</p>}

      {step.sampleProgram && (
        <pre className="bg-muted/40 border border-border p-3 text-sm font-mono overflow-x-auto mb-2 whitespace-pre">
          {stepData.sampleProgram}
        </pre>
      )}

      {stepData.panels && (
        <ul className="space-y-4 text-muted-foreground">
          {stepData.panels.map((panel: { name: string; description: string; bullets: string[] }) => (
            <li key={panel.name}>
              <p className="font-semibold text-foreground">{panel.name}</p>
              {panel.description && <p className="text-muted-foreground mb-1">{panel.description}</p>}
              {panel.bullets && <ul className="list-disc list-inside ml-4 space-y-1">{panel.bullets.map((b: string) => <li key={b}>{b}</li>)}</ul>}
            </li>
          ))}
        </ul>
      )}

      {stepData.suggestions && (
        <ul className="list-disc list-inside ml-4 text-muted-foreground space-y-1">
          {stepData.suggestions.map((suggestion: string) => <li key={suggestion}>{suggestion}</li>)}
        </ul>
      )}
    </div>
  );
}

export default async function DocSectionPage({ params }: PageProps) {
  const { slug } = await params;
  const id = slug as DocSectionId;
  const section = docs[id];

  if (!section) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            {section.title}
          </h1>
          {section.intro && (
            <p className="text-muted-foreground text-base">{section.intro}</p>
          )}
        </header>

        {section.steps.map((step: unknown) => renderStep(step as string | { title: string; items: string[]; description: string; sampleProgram: string; panels: { name: string; description: string; bullets: string[] }[]; suggestions: string[] }))}
      </div>
    </main>
  );
}


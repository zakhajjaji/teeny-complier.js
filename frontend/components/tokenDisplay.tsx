import { useState } from 'react';
import { Token } from '../lib/compiler';

function tokenTypeToClass(type: string): string {
  switch (type) {
    case 'KEYWORD':
      return 'text-blue-500';
    case 'NUMBER':
      return 'text-green-500';
    case 'STRING':
      return 'text-purple-500';
    case 'OPERATOR':
      return 'text-yellow-500';
    case 'PUNCTUATION':
      return 'text-red-500';
    case 'whitespace':
      return '';
    default:
      return 'text-foreground';
  }
}

export default function TokenDisplay({ tokens }: { tokens: Token[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (tokens.length === 0) {
    return <p className="text-muted-foreground">No tokens found</p>;
  }

  return (
    <div className="bg-muted/20 border border-border/50 p-3">
      <button
        type="button"
        className="w-full text-left flex items-center gap-2 py-1.5 px-2 hover:bg-muted/40 transition-colors text-foreground font-semibold text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted-foreground">{isOpen ? '▼' : '▶'}</span>
        <span>Tokens</span>
        <span className="text-xs font-normal text-muted-foreground">
          ({tokens.length} token{tokens.length === 1 ? '' : 's'})
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pt-2 border-t border-border/50">
          <div className="flex flex-wrap gap-3">
            {tokens.map((token, index) => (
              <div
                key={index}
                className={`border bg-muted/30 border-border/60 px-3 py-2 shadow-sm ${tokenTypeToClass(token.type)}`}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {token.type}
                  </span>
                  <span className={`font-mono font-medium ${tokenTypeToClass(token.type)}`}>
                    {String(token.value)}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground/80 mt-1.5">
                  L{token.line ?? '?'} · C{token.column ?? '?'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

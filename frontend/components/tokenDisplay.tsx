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
  if (tokens.length === 0) {
    return <p className="text-accent-foreground">No tokens found</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token, index) => (
        <div
          key={index}
          className={`bg-primary/20 px-3 py-1 border border-primary/30 ${tokenTypeToClass(token.type)}`}
        >
          <span className="font-semibold text-primary">{token.type}</span>
          <span className="mx-2">:</span>
          <span className={tokenTypeToClass(token.type)}>
            {String(token.value)}
          </span>
          <span className="block text-xs text-muted-foreground mt-1">
            line {token.line ?? '?'}, col {token.column ?? '?'}
          </span>
        </div>
      ))}
    </div>
  );
}

import CopyButton from './copyButton';

type JsSegment = { text: string; type: string };

// Very lightweight JS highlighter: keywords, strings, numbers, comments.
function getJsSegments(code: string): JsSegment[] {
  if (!code) return [];

  const keywordPattern =
    /\b(function|return|const|let|var|if|else|for|while|break|continue|switch|case|default|class|new|this)\b/g;
  const stringPattern = /("[^"\n]*"|'[^'\n]*'|`[^`\n]*`)/g;
  const numberPattern = /\b\d+(\.\d+)?\b/g;
  const commentPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;

  const tokens: { start: number; end: number; type: string }[] = [];

  const pushMatches = (regex: RegExp, type: string) => {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(code))) {
      tokens.push({ start: m.index, end: m.index + m[0].length, type });
    }
  };

  pushMatches(commentPattern, 'comment');
  pushMatches(stringPattern, 'string');
  pushMatches(keywordPattern, 'keyword');
  pushMatches(numberPattern, 'number');

  tokens.sort((a, b) => a.start - b.start);

  const segments: JsSegment[] = [];
  let pos = 0;
  for (const t of tokens) {
    if (t.start > pos) {
      segments.push({ text: code.slice(pos, t.start), type: 'plain' });
    }
    segments.push({ text: code.slice(t.start, t.end), type: t.type });
    pos = t.end;
  }
  if (pos < code.length) {
    segments.push({ text: code.slice(pos), type: 'plain' });
  }
  return segments;
}

function jsTypeToClass(type: string): string {
  switch (type) {
    case 'keyword':
      return 'text-blue-400';
    case 'string':
      return 'text-amber-300';
    case 'number':
      return 'text-green-300';
    case 'comment':
      return 'text-muted-foreground/70';
    default:
      return 'text-foreground';
  }
}

export default function JsOutput({
  code,
  error,
  isLoading,
}: {
  code: string;
  error: string | null;
  isLoading: boolean;
}) {
  const hasCode = typeof code === 'string' && code.trim().length > 0 && !error;
  const segments = hasCode ? getJsSegments(code) : [];

  return (
    <div className="bg-muted/20 border border-border/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Generated JavaScript</span>
          {!error && hasCode && !isLoading && (
            <span className="text-[11px] text-emerald-400">Compilation successful</span>
          )}
          {isLoading && (
            <span className="text-[11px] text-muted-foreground">Compiling…</span>
          )}
          {error && (
            <span className="text-[11px] text-red-400">No output (error above)</span>
          )}
        </div>
        <CopyButton text={code} />
      </div>

      <div className="mt-2 bg-background/60 border border-border overflow-x-auto">
        <pre className="p-3 text-sm font-mono whitespace-pre">
          {hasCode ? (
            segments.map((seg, i) => (
              <span key={i} className={jsTypeToClass(seg.type)}>
                {seg.text}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">
              {error
                ? 'No JavaScript generated due to compilation error.'
                : 'No JavaScript generated yet. Compile some Teeny code.'}
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}

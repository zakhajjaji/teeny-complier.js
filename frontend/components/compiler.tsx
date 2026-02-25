'use client';

import { useState, useCallback } from 'react';
import { compileStepByStep, type Token, type AST } from '../lib/compiler';
import TokenDisplay from './tokenDisplay';
import CopyButton from './copyButton';
import CodeEditor from './codeEditor';

export default function Compiler() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [ast, setAst] = useState<AST | null>(null);
  const [javascriptCode, setJavascriptCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [sourceCode, setSourceCode] = useState<string>('');

  // handles the compile button on click. 
  const handleCompile = useCallback(() => { 
    setIsLoading(true);
    setError(null);
    try {
      const result = compileStepByStep(sourceCode);
      setTokens(result.tokens);
      setAst(result.ast);
      setJavascriptCode(result.javascriptCode);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setTokens([]);
      setAst(null);
      setJavascriptCode('');
    } finally {
      setIsLoading(false);
    }
  }, [sourceCode]);

  const handleReset = useCallback(() => {
    setSourceCode("");
    setTokens([]);
    setAst(null);
    setJavascriptCode("");
    setError(null);
    setSourceCode('');
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <CodeEditor
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          className="w-full min-h-[280px] resize-y"
          rows={12}
          cols={80}
          placeholder="Enter your code here..."
        />
        <div className="flex items-center gap-8 mt-4">
          <button
            onClick={handleCompile}
            disabled={isLoading}
            className="relative px-0 py-3 font-sm text-md text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-foreground"
          >
            {isLoading ? 'Compiling...' : 'Compile'}
          </button>
          <button
            onClick={handleReset}
            type="button"
            className="relative px-0 py-2 font-sm text-md text-foreground/60 hover:text-foreground transition-colors after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-foreground"
          >
            Reset
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500">
          <h2 className="text-xl font-bold text-red-500 mb-2">
            Compilation Error
          </h2>
          <pre className="text-red-300 whitespace-pre-wrap">{error}</pre>
        </div>
      )}
      {!error && tokens.length > 0 && (
        <div className="space-y-6">
          <div className="bg-background border border-border p-4">
            <h2 className="text-2xl font-bold mb-4">
              Tokens (Lexical Analysis)
            </h2>
            <TokenDisplay tokens={tokens} />
          </div>

          <div className="bg-background border border-border p-4">
            <h2>AST (Abstract Syntax Tree)</h2>
            <pre className="bg-background/50 p-4 border border-border overflow-x-auto">
              <code className="text-sm">
                {ast ? JSON.stringify(ast, null, 2) : 'No AST available'}
              </code>
            </pre>
          </div>

          <div className="bg-background border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Generated JavaScript</h2>
              <CopyButton text={javascriptCode} />
            </div>
            <pre className="bg-background/50 p-4 border border-border overflow-x-auto">
              <code className="text-sm text-green-400">
                {javascriptCode || 'No JavaScript generated'}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

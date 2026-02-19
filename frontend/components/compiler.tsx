"use client";

import { useState, useCallback} from "react";
import { compile, tokenise, parse, compileStepByStep } from "../lib/compiler";
import { Token, AST } from "../lib/compiler";
import TextArea from "./textArea";
import TokenDisplay from "./tokenDisplay";
import CopyButton from "./copyButton";

export default function Compiler() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [codeInput, setCodeInput] = useState<string>(""); 
    const [tokens, setTokens] = useState<Token[]>([]);
    const [ast, setAst] = useState<AST | null>(null);
    const [javascriptCode, setJavascriptCode] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    const handleCompile = useCallback(() => {

        setIsLoading(true);
        setError(null);
       try {
        setError(null);
        const result = compileStepByStep(codeInput);
        console.log('Compilation result:', result);
        setTokens(result.tokens); 
        setAst(result.ast);
        setJavascriptCode(result.javascriptCode);
       } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError(String(error));
        }
        setTokens([]);
        setAst(null);
        setJavascriptCode("");
       }
    }, [codeInput]);

    return (
        <div className="container mx-auto px-4">   
            <div className="mb-6">
            <TextArea 
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                error={error}
                className="w-3/4 h-1/2 resize bg-background border border-border mx-auto p-10"
                rows={10}
                cols={10}
                placeholder="Enter your code here"
                
            />
            <button onClick={handleCompile} className="bg-primary text-white p-2 mt-4 mx-auto block" disabled={isLoading}>
                {isLoading ? 'Compiling...' : 'Compile'}
            </button>
            </div>
        {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500">
                <h2 className="text-xl font-bold text-red-500 mb-2">Compilation Error</h2>
                <pre className="text-red-300 whitespace-pre-wrap">{error}</pre>
            </div>
        )}
        {!error && tokens.length > 0 && (
            <div className="space-y-6">
                <div className="bg-background border border-border p-4">
                    <h2 className="text-2xl font-bold mb-4">Tokens (Lexical Analysis)</h2>
                <TokenDisplay tokens={tokens} />
                <CopyButton text={JSON.stringify(tokens, null, 2)} />
                </div>

                <div className="bg-background border border-border p-4">
                    <h2>AST (Abstract Syntax Tree)</h2>
                    <pre className="bg-background/50 p-4 border border-border overflow-x-auto">
                        <code className="text-sm">
                            {ast ? JSON.stringify(ast, null, 2) : 'No AST available'}
                        </code>
                    </pre>
                    <CopyButton text={JSON.stringify(ast, null, 2)} />
                </div>

                <div className="bg-background border border-border p-4">
                    <h2 className="text-2xl font-bold mb-4">Generated JavaScript</h2>
                    <pre className="bg-background/50 p-4 border border-border overflow-x-auto">
                        <code className="text-sm text-green-400">
                            {javascriptCode || 'No JavaScript generated'}
                        </code>
                    </pre>
                    <CopyButton text={javascriptCode} />
                </div>
            </div>
            )}
        </div>
    );
}   


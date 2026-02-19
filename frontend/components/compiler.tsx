"use client";

import { useState} from "react";
import { compile, tokenise, parse, compileStepByStep } from "../lib/compiler";
import { Token, AST } from "../lib/compiler";
import TextArea from "./textArea";

export default function Compiler() {
    const [codeInput, setCodeInput] = useState<string>(""); 
    const [tokens, setTokens] = useState<Token[]>([]);
    const [ast, setAst] = useState<AST | null>(null);
    const [javascriptCode, setJavascriptCode] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const handleCompile = () => {
       try {
        setError(null);
        const result = compileStepByStep(codeInput);

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
    }

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
            <button onClick={handleCompile} className="bg-primary text-white p-2 mt-4 mx-auto block">Compile</button>
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
                    <h2>Tokens (Lexical Analysis)</h2>
                    <div>
                        {tokens.map((token, index) => (
                            <div key={index}>
                                <span className="font-mono text-sm text-gray-500">{token.type}</span>
                                <span className="font-mono text-sm text-gray-500 ml-3">{String(token.value)}</span>
                            </div>
                        ))}
                    </div>
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
                    <h2 className="text-2xl font-bold mb-4">Generated JavaScript</h2>
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


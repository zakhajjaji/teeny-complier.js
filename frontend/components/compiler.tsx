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
            <TextArea 
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                error={error}
                className="w-3/4 h-1/2 resize bg-background border border-border rounded-md mx-auto p-10"
                rows={10}
                cols={10}
                placeholder="Enter your code here"
            />
            <button onClick={handleCompile} className="bg-primary text-white p-2 rounded-md mt-4 mx-auto block">Compile</button>
        </div>
    );
}   
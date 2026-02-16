"use client";

import { useState} from "react";
import { compile, tokenise, parse, compileStepByStep } from "../lib/compiler";
import { Token, AST } from "../lib/compiler";

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
        <div>
        </div>
    );
}   
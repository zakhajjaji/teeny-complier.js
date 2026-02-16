export interface Token {
    type: string;
    value: string | number;
    line?: number;
    column?: number;
}

export interface AST {
    type: string;
    body: any[];
    [key: string]: any;
}

export interface CompilationResult {
    tokens: Token[]; 
    ast: AST;
    javascriptCode: string;
}

const compilerModule = require('./compiler.js');

export function tokenise(sourceCode: string): Token[] {
    return compilerModule.tokenise(sourceCode);
}

export function parse(tokens: Token[]): AST {
    return compilerModule.parse(tokens);
}

export function compile(sourceCode: string): string {
    return compilerModule.compile(sourceCode);
}

export function compileStepByStep(sourceCode: string): CompilationResult {
    return compilerModule.compileStepByStep(sourceCode);
}
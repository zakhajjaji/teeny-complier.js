export interface Token {
    type: string;
    value: string | number;
    line?: number;
    column?: number;
}

export interface ASTNode {
    type: string;
    // Other properties on AST nodes can be any JSON-serialisable value.
    // Kept this as unknown (not any) so TypeScript forces narrowing
    [key: string]: unknown;
}

export interface AST extends ASTNode {
    body: ASTNode[];
}

export interface CompilationResult {
    tokens: Token[]; 
    ast: AST;
    javascriptCode: string;
}

import * as compilerModule from './compiler.js';

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
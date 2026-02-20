"use client";

import { useState, useCallback, useRef, useEffect} from "react";
import { NumberController, StringController } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { tokenise, type Token } from "../lib/compiler";

interface CodeEditorProps {
    id?: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    className: string;
    rows?: number;
    cols?: number;
    placeholder?: string;
}

const LINE_HEIGHT_PX = 20; // applies to both textarea and editor, important. single source of truth, easier to adjust and clear intentn with name and purpose. 
const GUTTER_WIDTH_PX = 44; 

// created this type to represent a peice of text with one type (KEYWORD, NUMBER, STRING, OPERATOR, etc.)
type Segment = {
    text: string;
    type: string;
    line: number;
    column: number;
}

// main function to get the segments from the source code.
function getSegments(source: string): Segment[] {
    if(!source) return [];
    try {
        const tokens = tokenise(source);
        return tokensToSegments(tokens);
    } catch {
        return [{ text: source, type: 'error', line: 1, column: 1 }];
    }
}

// turns the tokens into segments, fallback no whitespace handling yet, remember this !! 
function tokensToSegments(tokens: Token[]): Segment[] {
    const segments: Segment[] = [];
    for (const t of tokens) {
        segments.push({ text: String(t.value), type: t.type, line: t.line ?? 1, column: t.column ?? 1 }); 
    }
    return segments;
}

function typeToColour(type: string): string {
    if(type === 'KEYWORD') return 'text-blue-500';
    if(type === 'NUMBER') return 'text-green-500';
    if(type === 'STRING') return 'text-purple-500';
    if(type === 'OPERATOR') return 'text-yellow-500';
    if(type === 'PUNCTUATION') return 'text-red-500';
    return 'text-foreground';
}

// helper function to build the segments from the tokens, this is used to display the segments in the editor.
function buildSegmentsFromTokens(tokens: Token[]): Segment[] {
    const segments: Segment[] = [];
    for (const t of tokens) {
        segments.push({ text: String(t.value), type: t.type, line: t.line ?? 1, column: t.column ?? 1 }); 
    }
    return segments;
}
export default function CodeEditor({
    id, value, onChange, className = "", rows = 12, cols = 80, placeholder }: CodeEditorProps) {
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const gutterRef = useRef<HTMLDivElement>(null); 
        const lineCount = Math.max(rows, value.split('\n').length);

       useEffect(() => {
        const textarea = textareaRef.current;
        const gutter = gutterRef.current; 
        if(!textarea || !gutter) return; 

        const syncScroll = () => { // both text and gutter(width) scroll together, new concept. 
            gutter.scrollTop = textarea.scrollTop; // scroll top is the position of the textarea, new concept. 

        }; 
        textarea.addEventListener('scroll', syncScroll); // listen to scrolle event on textarea and sync the scroll position of the gutter. 
        return () => textarea.removeEventListener('scroll', syncScroll); // cleanup function to remove the event listener when the component unmounts. 
       }, []);

       return (
        <div className="flex font-mono text-sm" style={{ lineHeight: `${LINE_HEIGHT_PX}px` }}>
            <div
                ref={gutterRef}
                className="shrink-0 overflow-y-auto overflow-x-hidden select-none bg-muted/50 text-muted-foreground text-right pr-3 py-4 border-r border-border"
                style={{ width: GUTTER_WIDTH_PX, minHeight: "100%" }}
                aria-hidden
            >
                {Array.from({ length: lineCount }, (_, index) => (
                    <div key={index} style={{ height: LINE_HEIGHT_PX }}>
                        {index + 1}
                    </div>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                onChange={onChange}
                rows={rows}
                cols={cols}
                placeholder={placeholder}
                className={`flex-1 resize-y min-h-[280px] p-4 border-0 focus:ring-0 focus:outline-none bg-background placeholder:text-muted-foreground ${className}`}
                style={{ lineHeight: `${LINE_HEIGHT_PX}px` }}
                spellCheck={false}
            />
        </div>
    );
}
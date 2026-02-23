"use client";

import { useRef, useEffect } from "react";
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

export default function CodeEditor({
    id, value, onChange, className = "", rows = 12, cols = 80, placeholder }: CodeEditorProps) {
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const gutterRef = useRef<HTMLDivElement>(null); 
        const lineCount = Math.max(rows, value.split('\n').length);

        const highlightRef = useRef<HTMLDivElement>(null);
        const segments = getSegments(value);

        useEffect(() => {
            const textarea = textareaRef.current;
            const gutter = gutterRef.current;
            const highlight = highlightRef.current;
            if (!textarea || !gutter) return;

            const syncScroll = () => {
                gutter.scrollTop = textarea.scrollTop;
                if (highlight) {
                    highlight.scrollTop = textarea.scrollTop;
                    highlight.scrollLeft = textarea.scrollLeft;
                }
            };
            textarea.addEventListener("scroll", syncScroll);
            return () => textarea.removeEventListener("scroll", syncScroll);
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
                <div className="relative flex-1 min-h-[280px] flex flex-col">
                    <div
                        ref={highlightRef}
                        className="absolute inset-0 overflow-auto p-4 whitespace-pre pointer-events-none"
                        style={{ lineHeight: `${LINE_HEIGHT_PX}px` }}
                        aria-hidden
                    >
                        {segments.map((seg, i) => (
                            <span key={i} className={typeToColour(seg.type)}>
                                {seg.text}
                            </span>
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
                        className={`relative z-10 flex-1 min-h-[280px] w-full resize-y p-4 border-0 focus:ring-0 focus:outline-none bg-transparent placeholder:text-muted-foreground ${className}`}
                        style={{ lineHeight: `${LINE_HEIGHT_PX}px` }}
                        spellCheck={false}
                    />
                </div>
            </div>
        );
    }
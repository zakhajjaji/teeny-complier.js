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
        return tokensToSegments(source, tokens);
    } catch {
        return [{ text: source, type: 'error', line: 1, column: 1 }];
    }
}

// Turns tokens into segments. If tokens have start/end (character indices), we preserve
// whitespace by adding a segment for each gap between tokens. Otherwise fallback: one segment per token.
function tokensToSegments(source: string, tokens: Token[]): Segment[] {
    const segments: Segment[] = [];
    const first = tokens[0] as (Token & { start?: number; end?: number }) | undefined; // undefined if no tokens, remember this.
    const hasOffsets = first != null && typeof first.start === "number" && typeof first.end === "number"; // double check the values are numbers !!. 

    if (!hasOffsets) {
        for (const t of tokens) {
            segments.push({ text: String(t.value), type: t.type, line: t.line ?? 1, column: t.column ?? 1 });
        }
        return segments;
    }

    let pos = 0; // i,e position in the source code, where we at now.
    for (const t of tokens as (Token & { start: number; end: number })[]) {
        if (t.start > pos) { // if the start of the token is greater than the position, we add a whitespace segment.
            const gap = source.slice(pos, t.start);
            segments.push({ text: gap, type: "whitespace", line: t.line ?? 0, column: t.column ?? 0 });
            console.log("gap", gap);
            console.log("t.start", t.start);
            console.log("t.end", t.end);
            console.log("t.line", t.line);
            console.log("t.column", t.column);
        }
        segments.push({ // instead of using t.value, we use the original source from start to end of that token.
            text: source.slice(t.start, t.end),
            type: t.type,
            line: t.line ?? 0,
            column: t.column ?? 0,
        });
        pos = t.end; // update the position to the end of the token.
    }
    if (pos < source.length) { // any leftover text or whitespace at the end of the source code, add it to the segments.
        segments.push({ text: source.slice(pos), type: "whitespace", line: 0, column: 0 }); 
    }
    return segments;
}

function typeToColour(type: string): string {
    if (type === "KEYWORD") return "text-blue-500";
    if (type === "NUMBER") return "text-green-500";
    if (type === "STRING") return "text-purple-500";
    if (type === "OPERATOR") return "text-yellow-500";
    if (type === "PUNCTUATION") return "text-red-500";
    if (type === "whitespace") return " "; // keep spaces/newlines, no extra colour
    return "text-foreground";
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
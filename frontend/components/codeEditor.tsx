"use client";

import { useState, useCallback, useRef, useEffect} from "react";
import { NumberController } from "three/examples/jsm/libs/lil-gui.module.min.js";

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
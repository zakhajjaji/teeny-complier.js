"use client";
import { useState } from "react"; 

interface TextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string | null;
    className: string;
    rows: number;
    cols: number;
    placeholder: string;
}

export default function TextArea({ value, onChange, error, className, rows, cols, placeholder }: TextAreaProps) {
    return (
    <div>
        <textarea value={value} onChange={onChange} className={className} rows={rows} cols={cols} placeholder={placeholder} />
        {error && <p className="text-red-500">{error}</p>}
    </div>
    );
}
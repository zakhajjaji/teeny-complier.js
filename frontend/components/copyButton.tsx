import { useState } from "react";
import { CopyIcon } from "lucide-react";

export default function CopyButton({text}: {text: string}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true); 
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            disabled={copied || !text}
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1.5 rounded text-sm inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Copy to clipboard"
        >
            {copied ? 'Copied!' : <><CopyIcon className="w-4 h-4" /> Copy</>}
        </button>
    );
}

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
        <button onClick={handleCopy} className="bg-primary text-white p-2 mt-4 mx-auto block" disabled={copied}>
            {copied ? 'Copied!' : <CopyIcon className="w-4 h-4" />}
        </button>
    );
}

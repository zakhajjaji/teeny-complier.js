import { Token } from "../lib/compiler";

export default function TokenDisplay({tokens}: {tokens: Token[]}) {
    if (tokens.length === 0) {
        return <p className="text-accent-foreground">No tokens found</p>
    }

    return (
        <div className="bg-background border border-border p-4">
             {tokens.map((token, index) => (
                <div 
                    key={index}
                    className="bg-primary/20 px-3 py-1 border border-primary/30 mb-2"
                >
                    <span className="font-semibold text-primary">{token.type}</span>
                    <span className="mx-2">:</span>
                    <span className="text-foreground">{String(token.value)}</span>
                </div>
            ))}
        </div>
    );
}
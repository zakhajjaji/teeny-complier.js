"use client";

import { useState } from "react";

function getChildEdges(node: Record<string, unknown>): [string, unknown[]][] {
    if (!node || typeof node !== "object") return [];
    const edges: [string, unknown[]][] = [];
    for (const key of Object.keys(node)) {
      if (key === "type") continue;
      const val = node[key];
      if (val != null && typeof val === "object" && "type" in val) {
        edges.push([key, [val]]);
      } else if (Array.isArray(val)) {
        const children = val.filter((x) => x != null && typeof x === "object" && "type" in x);
        if (children.length) edges.push([key, children]);
      }
    }
    return edges;
  }

  function getNodeLabel(node: Record<string, unknown>): string {
    const type = (node.type as string) ?? "?";
    if (typeof node.value !== "undefined") return `${type} (${JSON.stringify(node.value)})`;
    if (typeof node.name !== "undefined") return `${type} (${node.name})`;
    if (typeof node.operator !== "undefined") return `${type} (${node.operator})`;

    return type;
  }

 function AstNode({ node, label } : {node: unknown, label?: string}) {
  if(node == null) return null;
  if(typeof node !=="object" || !("type" in node)) {
    return <span className="text-muted-foreground">{String(node)}</span>
  }

  const n =  node as Record<string, unknown>; 
  const edges = getChildEdges(n);

  return (
    <div className="ml-3 pl-3 border-l-2 border-primary/20 my-1">
      <div className="font-mono text-sm flex items-baseline gap-2 flex-wrap">
        {label && (
          <span className="text-muted-foreground/80 text-xs uppercase tracking-wide">{label}</span>
        )}
        <span className="font-medium text-foreground">{getNodeLabel(n)}</span>
      </div>
      {edges.map(([key, children]) => (
        <div key={key} className="mt-2">
          <div className="text-muted-foreground/70 text-xs mb-0.5">{key}</div>
          {children.map((child, i) => (
            <AstNode key={`${key}-${i}`} node={child} label={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AstTree({ ast }: { ast: Record<string, unknown> | null }) {
  const [isOpen, setIsOpen] = useState(true);
  if (!ast) return <p className="text-muted-foreground">No AST</p>;

  return (
    <div className="bg-muted/20 border border-border/50 p-3">
      <button
        type="button"
        className="w-full text-left flex items-center gap-2 py-1.5 px-2 hover:bg-muted/40 transition-colors text-foreground font-semibold text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted-foreground">{isOpen ? "▼" : "▶"}</span>
        <span>AST tree</span>
        <span className="text-xs font-normal text-muted-foreground">(tree)</span>
      </button>
      {isOpen && (
        <div className="mt-3 pt-2 border-t border-border/50">
          <AstNode node={ast} />
        </div>
      )}
    </div>
  );
}

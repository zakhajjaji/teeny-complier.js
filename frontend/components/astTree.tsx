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
    <div className="ml-4 border-l border-border pl-2">
      <div className="font-mono text-sm">
        {label && <span className="text-muted-foreground">{label}: </span>}
        {getNodeLabel(n)}
      </div>
      {edges.map(([key, children]) => (
        <div key={key}>
          <div className="text-muted-foreground text-xs mt-1">{key}</div>
          {children.map((child, i) => (
            <AstNode key={`${key}-${i}`} node={child} label={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AstTree({ ast }: { ast: Record<string, unknown> | null }) {
  if (!ast) return <p className="text-foreground">No AST</p>;
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="font-mono text-sm">
      <button className="hover:text-primary text-muted-foreground text-lg font-bold mt-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}> Open AST <span className="text-xs">({Object.keys(ast).length} nodes)</span>
        {isOpen ? " ▼" : " ▶"}
      </button>
      {isOpen && <AstNode node={ast} />}
    </div>
  );
}

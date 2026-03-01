"use client";

import { useEffect, useRef, useState } from "react";
import { type ASTNode } from "../lib/compiler";

function getNodeLabel(node: Record<string, unknown>): string {
    const type = (node.type as string) ?? "?";
    if (typeof node.value !== "undefined") return `${type} (${JSON.stringify(node.value)})`;
    if (typeof node.name !== "undefined") return `${type} (${node.name})`;
    if (typeof node.operator !== "undefined") return `${type} (${node.operator})`;
    return type;
  }

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
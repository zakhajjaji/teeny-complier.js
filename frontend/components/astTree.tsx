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
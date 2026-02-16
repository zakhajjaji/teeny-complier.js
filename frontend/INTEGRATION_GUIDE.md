# Backend Integration Guide - Step by Step

## 🎯 What Does "Backend Integration" Mean?

**In simple terms:** Connect your frontend (React/Next.js) to your backend compiler code so users can:
1. Type code in a text editor
2. Click "Compile"
3. See the results (tokens, AST, generated JavaScript)

---

## 📋 What You Need to Build

### Step 1: Create a Bridge File (`lib/compiler.js`)
**Purpose:** Import your backend CommonJS modules into the frontend

**Why?** Your backend uses `require()` (CommonJS), but Next.js uses `import` (ES Modules). We need a bridge.

**What to do:**
- Create `frontend/lib/compiler.js`
- Use `require()` to import backend functions
- Export them so React components can use them

### Step 2: Create TypeScript Wrapper (`lib/compiler.ts`)
**Purpose:** Add TypeScript types for better development experience

**What to do:**
- Create `frontend/lib/compiler.ts`
- Import the JS bridge file
- Add type definitions
- Export typed functions

### Step 3: Build the Compiler Component (`components/compiler.tsx`)
**Purpose:** The UI where users interact with the compiler

**What to do:**
- Create a textarea for code input
- Add a "Compile" button
- Display results (tokens, AST, output)
- Handle errors gracefully

---

## 🔧 Functions You'll Work With

### From Backend (`src/`):

1. **`tokenise(sourceCode: string)`**
   - **Input:** String of code (e.g., `"let x = 5"`)
   - **Output:** Array of token objects
   - **Example:**
     ```javascript
     tokenise("let x = 5")
     // Returns: [
     //   { type: 'KEYWORD', value: 'let', line: 1, column: 1 },
     //   { type: 'IDENTIFIER', value: 'x', line: 1, column: 5 },
     //   { type: 'OPERATOR', value: '=', line: 1, column: 7 },
     //   { type: 'NUMBER', value: 5, line: 1, column: 9 }
     // ]
     ```

2. **`parse(tokens: Token[])`**
   - **Input:** Array of tokens (from tokenise)
   - **Output:** AST object
   - **Example:**
     ```javascript
     parse(tokens)
     // Returns: {
     //   type: 'Program',
     //   body: [
     //     {
     //       type: 'VariableDeclaration',
     //       name: 'x',
     //       init: { type: 'NumberLiteral', value: 5 }
     //     }
     //   ]
     // }
     ```

3. **`compile(sourceCode: string)`**
   - **Input:** String of code
   - **Output:** Generated JavaScript string
   - **Example:**
     ```javascript
     compile("let x = 5")
     // Returns: "let x = 5;"
     ```

---

## 📝 Step-by-Step Implementation

### **STEP 1: Create the JavaScript Bridge**

**File:** `frontend/lib/compiler.js`

```javascript
// This file bridges CommonJS (backend) with ES Modules (frontend)

const tokeniserModule = require('../../src/tokeniser');
const parserModule = require('../../src/parser');
const compilerModule = require('../../src/index');

// Export functions that frontend can use
function tokenise(sourceCode) {
  return tokeniserModule.tokenise(sourceCode);
}

function parse(tokens) {
  return parserModule.parse(tokens);
}

function compile(sourceCode) {
  return compilerModule.compile(sourceCode);
}

// Optional: Get step-by-step results
function compileStepByStep(sourceCode) {
  const tokens = tokenise(sourceCode);
  const ast = parse(tokens);
  const output = compile(sourceCode);
  
  return {
    tokens,
    ast,
    output
  };
}

module.exports = {
  tokenise,
  parse,
  compile,
  compileStepByStep
};
```

**What this does:**
- Uses `require()` to load backend modules
- Wraps them in functions
- Exports them so React can import

---

### **STEP 2: Create TypeScript Wrapper**

**File:** `frontend/lib/compiler.ts`

```typescript
// Type definitions
export interface Token {
  type: string;
  value: string | number;
  line?: number;
  column?: number;
}

export interface AST {
  type: string;
  body: any[];
  [key: string]: any;
}

export interface CompilationResult {
  tokens: Token[];
  ast: AST;
  output: string;
}

// Import the JS bridge (ignore TypeScript errors for require)
// @ts-ignore
const compilerModule = require('./compiler.js');

// Export typed functions
export function tokenise(sourceCode: string): Token[] {
  return compilerModule.tokenise(sourceCode);
}

export function parse(tokens: Token[]): AST {
  return compilerModule.parse(tokens);
}

export function compile(sourceCode: string): string {
  return compilerModule.compile(sourceCode);
}

export function compileStepByStep(sourceCode: string): CompilationResult {
  return compilerModule.compileStepByStep(sourceCode);
}
```

**What this does:**
- Adds TypeScript types
- Provides autocomplete in your IDE
- Makes code safer

---

### **STEP 3: Build the Compiler Component**

**File:** `frontend/components/compiler.tsx`

**What you need:**
1. **State management** (useState hooks)
   - `sourceCode` - user's input
   - `tokens` - result from tokenise
   - `ast` - result from parse
   - `output` - compiled JavaScript
   - `error` - any errors

2. **Event handlers**
   - `handleCompile()` - runs compile function
   - `handleClear()` - resets everything
   - `handleCodeChange()` - updates sourceCode state

3. **UI elements**
   - Textarea for input
   - Button to compile
   - Sections to display results
   - Error messages

**Basic structure:**
```typescript
"use client";

import { useState } from "react";
import { compileStepByStep } from "@/lib/compiler";

export default function Compiler() {
  const [sourceCode, setSourceCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCompile = () => {
    try {
      setError(null);
      const compilationResult = compileStepByStep(sourceCode);
      setResult(compilationResult);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Textarea for code input */}
      {/* Compile button */}
      {/* Display results */}
      {/* Display errors */}
    </div>
  );
}
```

---

## 🎓 Key Concepts to Understand

### 1. **State Management**
- `useState` stores data that changes
- When state changes, React re-renders

### 2. **Event Handlers**
- Functions that run when user interacts (click, type, etc.)
- Usually update state

### 3. **Error Handling**
- Wrap compiler calls in `try/catch`
- Show friendly error messages

### 4. **Data Flow**
```
User types code → State updates → User clicks compile → 
Call backend function → Update result state → Display results
```

---

## ✅ Checklist

- [ ] Create `lib/compiler.js` bridge file
- [ ] Create `lib/compiler.ts` TypeScript wrapper
- [ ] Create `components/compiler.tsx` component
- [ ] Add state management (useState)
- [ ] Add compile button handler
- [ ] Display tokens, AST, and output
- [ ] Add error handling
- [ ] Style the component
- [ ] Test with sample code

---

## 🚀 Next Steps

1. Start with Step 1 (bridge file) - I can help you write it
2. Then Step 2 (TypeScript wrapper)
3. Finally Step 3 (React component)

**Ready to start?** Let me know which step you want to tackle first!

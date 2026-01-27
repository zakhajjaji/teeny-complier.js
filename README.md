# Teeny Compiler - the project overview

---

- This project is a portfolio piece to demonstrate how I built a compiler that transpiles a custom "Teeny" language to JavaScript. This project will demonstrate the classic compilation pipeline:

---

## Features

- 🔤 **Lexical Analysis** - Tokenises Teeny source code
- 🌳 **Abstract Syntax Tree** - Builds structured representation
- ⚙️ **Code Generation** - Transpiles to JavaScript
- 📊 **Pipeline Visualisation** - Clear compilation stages
-  **Portfolio Ready** - Demonstrates compiler design principles

---

## Architecture

```
┌─────────────┐
│ Teeny Code  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Tokeniser  │ ◄─── Lexical Analysis
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Parser    │ ◄─── Syntax Analysis
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     AST     │ ◄─── Abstract Syntax Tree
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Traverser │ ◄─── AST Traversal
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Generator │ ◄─── Code Generation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ JavaScript  │
└─────────────┘
```

---

## Compilation Pipeline

The Teeny compiler follows the classic **compilation pipeline**:

| Stage | Component | Purpose |
|-------|-----------|---------|
| **1️⃣** | Source Code | Input Teeny language code |
| **2️⃣** | Tokeniser | Breaks code into tokens (lexical analysis) |
| **3️⃣** | Parser | Builds Abstract Syntax Tree (syntax analysis) |
| **4️⃣** | AST | Structured representation of code |
| **5️⃣** | Traverser | Walks the AST tree |
| **6️⃣** | Code Generator | Transforms AST to JavaScript |
| **7️⃣** | JavaScript Output | Final transpiled code |

### Visual Flow

```
Source Code → Tokeniser → Parser → AST → Code Generator → JavaScript Output
     📝          🔤          🌳         ⚙️              📄
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/teeny-complier-js.git

# Navigate to project directory
cd teeny-complier-js

# Install dependencies (if any)
npm install
```

---

## Usage

```bash
# Run the compiler
node src/index.js <input.teeny>

# Example
node src/index.js examples/hello.teeny
```

### Example Teeny Code

```teeny
// Example Teeny program
let x = 10
let y = 20
let sum = x + y
print sum
```

### Generated JavaScript

```javascript
// Generated JavaScript output
let x = 10;
let y = 20;
let sum = x + y;
console.log(sum);
```

---

## Project Structure (initial set up)

```
teeny-complier-js/
├── 📁 src/
│   ├── 📄 index.js          # Main entry point
│   ├── 📄 tokeniser.js      # Lexical analyser
│   └── 📄 traverser.js      # AST traverser
├── 📄 package.json          # Project configuration
├── 📄 README.md             # This file
└── 📄 .gitignore            # Git ignore rules
```

---

## Technologies

- **JavaScript** - Core implementation language
- **Node.js** - Runtime environment
- **Compiler Design** - Classic compilation techniques

---

## 📝 License

This project is licensed under the **ISC License**.

---

##  Status

> **Note:** This is a portfolio project demonstrating compiler design principles and the compilation pipeline.

---



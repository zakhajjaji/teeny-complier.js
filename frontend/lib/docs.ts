export type DocSectionId =
  | 'quickstart'
  | 'language'
  | 'pipeline'
  | 'ui'
  | 'limitations';

export const docs = {
  quickstart: {
    title: 'Quickstart',
    intro:
      'Teeny is a tiny teaching language that compiles to JavaScript. This app lets you see every step of the compilation pipeline: tokeniser, parser (AST) and code generator.',
    steps: [
      {
        title: '1. Open the playground',
        items: [
          'Go to the main page of the app.',
          'You will see a code editor for Teeny at the top, which is where you can write your code. You will also see a button to compile your code. When you click the button, the app will compile your code and show you the tokens, AST tree and Generated JavaScript below.',
        ],
      },
      {
        title: '2. Paste a simple Teeny program',
        description:
          'Use this example and click Compile in the UI to see how each panel updates.',
        sampleProgram: `let x = 10
let y = 20
let sum = x + y
print sum`,
      },
      {
        title: '3. Read the panels',
        panels: [
          {
            name: 'Tokens (Lexical Analysis)',
            description:
              'Shows each token as a chip with its type, value, and source location (line/column).',
            bullets: [
              'Type: KEYWORD, IDENTIFIER, NUMBER, STRING, OPERATOR, PUNCTUATION, etc.',
              'Value: the exact lexeme from your program (e.g. "let", "x", "10").',
              'Line / column: where the token came from in the source.',
            ],
          },
          {
            name: 'AST (Abstract Syntax Tree)',
            description:
              'Shows the tree of nodes produced by the parser, starting from a Program root.',
            bullets: [
              'Root node type is Program with a body array of child nodes.',
              'Common node types: VariableDeclaration, BinaryExpression, PrintStatement, ReturnStatement, IfStatement, WhileStatement, ForStatement, etc.',
              'You can expand/collapse parts of the tree to explore how the parser understood your code.',
            ],
          },
          {
            name: 'Generated JavaScript',
            description:
              'Shows the JavaScript produced from the AST, with basic syntax highlighting and a copy-to-clipboard button.',
            bullets: [
              'The code is formatted in a monospace block with horizontal scrolling if needed.',
              'Use the Copy button to copy the generated JavaScript into another environment if you want to run it there.',
            ],
          },
        ],
      },
      {
        title: '4. Reset and try other snippets',
        description:
          'Use the Reset button in the UI to clear the editor and outputs, then experiment with different programs.',
        suggestions: [
          'Change numbers or variable names and recompile.',
          'Add if, while, or for statements to see how the AST tree and Generated JavaScript change.',
          'Try using arrays and indexing, e.g. let xs = [1, 2, 3]; print xs[0].',
        ],
      },
    ],
  },

  language: {
    title: 'Teeny Language Reference',
    intro:
      'This reference describes the subset of Teeny that your compiler UI currently supports.',
    steps: [
      {
        title: 'Literals: numbers, strings, arrays',
        description:
          'Teeny supports numeric literals, string literals and array literals.',
        panels: [
          {
            name: 'Numbers',
            description: 'Integers and decimals',
            bullets: ['10', '42', '3.14'],
          },
          {
            name: 'Strings',
            description: 'Double or single quoted strings',
            bullets: ['"hello"', "'world'"],
          },
          {
            name: 'Arrays',
            description: 'Array literals using [ ... ]',
            bullets: ['[1, 2, 3]', '["hello", "world"]'],
          },
        ],
        sampleProgram: `let n = 3.14
let msg = "hello"
let xs = [1, 2, 3]
print msg`,
      },
      {
        title: 'Variables and assignment',
        description:
          'Use `let` to declare variables. You can also reassign existing variables and array elements.',
        sampleProgram: `let x = 10
let y = 20
x = x + 1
let sum = x + y
print sum`,
      },
      {
        title: 'Expressions',
        description:
          'Expressions can include arithmetic operators (+, -, *, /) and comparisons (<, >).',
        sampleProgram: `let a = 1 + 2
let b = 3 * 4
let bigger = b > 10
print bigger`,
      },
      {
        title: 'Indexing and member access',
        description:
          'Index into arrays using `arr[0]` syntax.',
        sampleProgram: `let xs = [1, 2, 3]
xs[0] = 10
print xs[0]`,
      },
      {
        title: 'Control flow: if, while, for',
        description:
          'Control flow uses parentheses after the keyword and a single statement as the body.',
        panels: [
          {
            name: 'if (condition) statement [else statement]',
            description: 'Single-statement form (no block parsing yet)',
            bullets: ['if(x > 5) return 5;', 'if(x = 5) return 5;'],
          },
          {
            name: 'while (condition) statement',
            description: 'Single-statement form',
            bullets: ['while (true) return 5;', 'while (x > 5) return 5;'],
          },
          {
            name: 'for (init; test; update) statement',
            description: 'Block parsing with { ... } is not supported yet',
            bullets: [
              'for(let i = 0; i < 10; i++) return 5',
              'for(; i < 10; i++) return 5',
            ],
          },
        ],
        suggestions: [
          'Try switching x around in the conditions and watch how the AST changes.',
          'For loops: keep the body as a single statement (e.g. `return ...`).',
        ],
      },
    ],
  },

  pipeline: {
    title: 'Compilation Pipeline',
    intro:
      'This is the classic compiler pipeline shown by the UI panels.',
    steps: [
      {
        title: '1) Source Code → Tokens (tokeniser)',
        items: [
          'The tokeniser scans the input text left-to-right.',
          'It produces token objects like NUMBER, KEYWORD, IDENTIFIER, STRING, OPERATOR and PUNCTUATION.',
          'Tokens include source location (line/column) for better error messages and UI display.',
        ],
      },
      {
        title: '2) Tokens → AST (parser)',
        items: [
          'The parser consumes the token array and builds an Abstract Syntax Tree.',
          'Each AST node has a `type` (e.g. Program, VariableDeclaration, BinaryExpression).',
          'Your UI renders the AST as an expandable tree.',
        ],
      },
      {
        title: '3) AST → JavaScript (code generation)',
        items: [
          'The generator walks the AST and emits JavaScript code.',
          'The “Generated JavaScript” panel shows the final transpiled output.',
          'Use Copy to move the output into a JS runtime if you want to execute it.',
        ],
      },
      {
        title: 'Example: observe the steps',
        sampleProgram: `let x = 10
let y = 20
let sum = x + y
print sum`,
        description:
          'Compile this example and compare how the same program appears in Tokens, AST and Generated JavaScript.',
      },
    ],
  },

  ui: {
    title: 'How to Use the Playground UI',
    intro:
      'A short guide to reading the panels in the Teeny compiler app.',
    steps: [
      {
        title: 'Editor',
        items: [
          'Type code into the editor.',
          'Line numbers help you correlate the source with tokens and errors.',
        ],
      },
      {
        title: 'Tokens panel',
        items: [
          'Each token is shown as a colored chip.',
          'You can see token type, value and source position (line/column).',
        ],
      },
      {
        title: 'AST tree panel',
        items: [
          'The AST is displayed as a tree of nodes.',
          'Expand/collapse lets you explore the structure without getting overwhelmed.',
        ],
      },
      {
        title: 'Generated JavaScript panel',
        items: [
          'This shows the transpiled JavaScript output.',
          'Use the Copy button to copy the result.',
          'If compilation fails, you will see a clear error message instead of code.',
        ],
      },
    ],
  },

  limitations: {
    title: 'Limitations & Troubleshooting',
    intro:
      'Teeny is intentionally small and these are the known limitations of this teaching compiler.',
    steps: [
      {
        title: 'Single-statement control flow (no blocks)',
        description:
          'In this version, the parser does not implement block parsing for { ... }.' ,
        sampleProgram: `// Example that may fail: blocks are not implemented yet
if(x > 5) { return 5; }`,
        suggestions: [
          'Use the single-statement form instead (e.g. `if(x > 5) return 5;`).',
          'For now, avoid { ... } blocks after conditions.',
        ],
      },
      {
        title: 'Supported subset',
        panels: [
          {
            name: 'Supported (core)',
            description: 'The compiler can tokenise/parse and generate JS for common constructs.',
            bullets: [
              'let declarations',
              'arithmetic expressions',
              'arrays and indexing',
              'if / while / for (single-statement form)',
              'return and print',
            ],
          },
          {
            name: 'Not supported yet',
            description: 'These are either missing or incomplete in the current implementation.',
            bullets: [
              'function definitions (func keyword)',
              'brace blocks { ... } as statement bodies',
            ],
          },
        ],
      },
      {
        title: 'Errors: read line and column numbers',
        items: [
          'Compilation errors include source location (line/column numbers).',
          'Use that to quickly find the problematic token in the editor.',
        ],
      },
    ],
  },
} as const;

export type Docs = typeof docs;

export const docsIndex: { id: DocSectionId; title: string; description: string }[] = [
  {
    id: 'quickstart',
    title: 'Quickstart',
    description:
      'Paste Teeny code, compile it, and explore the Tokens, AST tree, and Generated JavaScript panels.',
  },
  {
    id: 'language',
    title: 'Teeny Language Reference',
    description:
      'Syntax and examples for literals, expressions, variables, arrays and control flow.',
  },
  {
    id: 'pipeline',
    title: 'Compilation Pipeline',
    description:
      'Tokeniser → Parser (AST) → Code Generation (JavaScript) explained.',
  },
  {
    id: 'ui',
    title: 'Playground UI Guide',
    description:
      'What the editor, tokens, AST tree and generated JavaScript panels mean.',
  },
  {
    id: 'limitations',
    title: 'Limitations & Troubleshooting',
    description:
      'Known gaps (like blocks { ... }) and tips for reading error messages.',
  },
];
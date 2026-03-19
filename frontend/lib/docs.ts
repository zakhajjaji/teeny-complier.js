export type DocSectionId = 'quickstart';

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
};

export type Docs = typeof docs;

export const docsIndex: { id: DocSectionId; title: string; description: string }[] = [
  {
    id: 'quickstart',
    title: 'Quickstart',
    description:
      'Learn how to use the Teeny compiler playground and see how each step of the compilation pipeline works.',
  },
];
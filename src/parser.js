const KEYWORDS = ["let", "func", "if", "else", "return", "print"];

function parse(tokens) {
  let current = 0;
  const ast = {
    type: 'Program',
    body: [],
  };

  function walk() {
    let token = tokens[current];
    let node; 
    if (token.type === 'NUMBER') {
      current++;
      node = { type: 'NumberLiteral', value: token.value };
    } else if (token.type === 'STRING') {
      current++; 
      node = { type: 'StringLiteral', value: token.value };
    } else if (token.type === 'IDENTIFIER') {
      current++; 
      node = { type: 'Identifier', name: token.value };
    } else if (token.type === 'WHITESPACE') {
      current++; 
      return walk(); // this skips whitepsace and parses the next token instead
    } else if (token.type === 'KEYWORD' && KEYWORDS.includes(token.value)) {
      current++; 
      let name = walk(); 
      current++; 
      let init = walk(); 
      return {
        type: 'VariableDeclaration',
        declarations: [{  // ← Need this array wrapper
          id: name,
          init: init
        }]
      };
    } else {
      throw new Error(`Unknown token: ${token.type}`);  
    }
    if (node && current < tokens.length && tokens[current].type === 'OPERATOR') {
      let operator = tokens[current].value; 
      current++;
      let right = walk(); 
      return {
        type: 'BinaryExpression',
        left: node,
        operator: operator,
        right: right
      };
    }
    return node;
  }


  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

// Token source: The token array comes from tokenise() in tokeniser.js, which converts source code into tokens.
// How it works: current tracks the array index. 
// walk() reads tokens[current], maps the token type to an AST node (NumberLiteral, StringLiteral, etc.), 
// increments current++ to advance, and returns that node. 
// The outer parse() function calls walk() in a loop, pushing each returned node into ast.body. 
// It returns the complete AST tree with type 'Program' containing all nodes.


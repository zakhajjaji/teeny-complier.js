function parse(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];
    if (token.type === 'NUMBER') {
      current++;
      return { type: 'NumberLiteral', value: token.value };
    }
    if (token.type === 'STRING') {
      current++;
      return { type: 'StringLiteral', value: token.value };
    }
    if (token.type === 'IDENTIFIER') {
      current++;
      return { type: 'Identifier', name: token.value };
    }
    if (token.type === 'WHITESPACE') {
      current++;
      return { type: 'Whitespace', value: token.value };
    }
    if (token.type === 'KEYWORD' && token.value === 'let') {
      current++; 
      let name = walk(); // getting the identifier 
      current++; // assuming a '=' after, we skip
      let init = walk(); // getting the initial value, 10 or 'hello'
      return {
        type: 'VariableDeclaration', 
        declarations: [{
          id: name, 
          init: init
        }]
      }
    }
    if (token.type === 'OPERATOR') {
      current++; 
      return {
        type: 'Operator', 
        value: token.value 
      };
    }

    throw new Error(`Unknown token: ${token.type}`);
  }
  const ast = {
    type: 'Program',
    body: [],
  };

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


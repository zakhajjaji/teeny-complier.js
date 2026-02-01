function parse(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];
    if (token.type === 'NUMBER') {
      current++;
      return { type: 'NumberLiteral', value: token.value };
    }
    if (token.type === 'STRING' & token.value === 'func') {
      current++;
      return { type: 'FunctionDeclaration', name: token.value, parameters: [], body: [] };
    }
    if (token.type === 'IDENTIFIER' & token.value === '(') {
      current++;
      return { type: 'CallExpression', callee: token.value, arguments: [] };
    }
    if (token.type === 'OPERATOR' & token.value === '+') {
      current++;
      return { type: 'BinaryExpression', left: token.value, operator: token.value, right: token.value };
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


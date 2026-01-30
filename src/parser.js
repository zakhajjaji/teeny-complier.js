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
    if (token.type === 'OPERATOR' ) {
      current++;
      return { type: 'Operator', value: token.value };
    }
    if (token.type === 'KEYWORD') {
      current++;
      return { type: 'Keyword', value: token.value };
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

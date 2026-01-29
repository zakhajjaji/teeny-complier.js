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

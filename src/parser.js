const KEYWORDS = ["let", "func", "if", "else", "return", "print"];

function parse(tokens) {
  let current = 0;
  const ast = {
    type: 'Program',
    body: [],
  };

  function walk() {
    if (current >= tokens.length) {
      return null; // End of tokens
    }
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
      node = { type:'Identifier', name: token.value };
    } else if (token.type === 'WHITESPACE') {
      current++; 
      return walk(); 
    // this skips whitepsace and parses the next token instead
    } else if (token.type === 'PUNCTUATION' && token.value === ';') {
      current++; 
      return walk(); 
    } else if (token.type === 'PUNCTUATION' && token.value === '[') {
      current++; // 'skip '['
      const elements = [];
      while(current < tokens.length && tokens[current].value !== ']') {
        if (tokens[current].type !== 'WHITESPACE' && tokens[current].value !== ',') {
          elements.push(walk());
        } else {
          current++;
        }
      }
      current++; // skip ']'
      node = {
        type: 'ArrayExpression',
        elements
      };
    } else if (token.type === 'KEYWORD' && token.value === 'return') {
        current++; 

         const argument = (current < tokens.length && 
                       !(tokens[current].type === 'PUNCTUATION' && tokens[current].value === ';'))
        ? walk() 
        : null;
        return {
          type: 'ReturnStatement',
          argument: argument
        };
     
      } else if (token.type === 'KEYWORD' && token.value === 'if') {
        current++;   

        if (current >= tokens.length || tokens[current].value !== '(') {
          throw new Error('Expected ( after if condition');
        }
        current ++;

        let test = null; 
        if (current < tokens.length && tokens[current].value !== ')') {
          test = walk();
        }

        if (current >= tokens.length || tokens[current].value !== ')') {
          throw new Error('Expected ) after if condition');
        }
        current ++;
        const consequent = walk(); 
        let alternate = null; 
        if (current < tokens.length && tokens[current].type === 'KEYWORD' && tokens[current].value === 'else') {
          current++; 
          alternate = walk();
        }
        return {
          type: 'IfStatement',
          test: test,
          consequent: consequent,
          alternate: alternate
        }
    
    } else if (token.type === 'KEYWORD' && KEYWORDS.includes(token.value)) {
      current++; 
      let name = walk(); 
      current++; 
      let init = walk(); 
      node = {
        type: 'VariableDeclaration',
        declarations: [{  // ← Need this array wrapper
          id: name,
          init: init
        }]
      };
    } else {
      throw new Error(`Unknown token: ${token.type}`);  
    }
    
    // Check for MemberExpression (arr[0]) after parsing identifier/expression
    while (node && current < tokens.length && tokens[current].type === 'PUNCTUATION' && tokens[current].value === '[') {
      current++; // skip '['
      const property = walk(); // parse the index/property
      if (current < tokens.length && tokens[current].value === ']') {
        current++; // skip ']'
        node = {
          type: 'MemberExpression',
          object: node,
          property: property,
          computed: true
        };
      } else {
        throw new Error('Expected closing bracket ]');
      }
    }

    // Check for AssignmentExpression (x = 5 or arr[0] = 5)
    if (node && (node.type === 'Identifier' || node.type === 'MemberExpression') 
        && current < tokens.length && tokens[current].type === 'OPERATOR' && tokens[current].value === '=') {
      current++; // skip '='
      const right = walk(); // parse the right-hand side
      return {
        type: 'AssignmentExpression',
        left: node,
        operator: '=',
        right: right
      };
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
    const result = walk();
    if (result !== null) {
      ast.body.push(result);
    }
  }
  return ast;
}

module.exports = { parse };

// Token source: The token array comes from tokenise() in tokeniser.js, which converts source code into tokens.
// How it works: current tracks the array index. 
// walk() reads tokens[current], maps the token type to an AST node (NumberLiteral, StringLiteral, etc.), 
// increments current++ to advance, and returns that node. 
// The outer parse() function calls walk() in a loop, pushing each returned node into ast.body. 
// It returns the complete AST tree with type 'Program' containing all nodes.


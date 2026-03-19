// Main compiler entry point (ES module)

import { tokenise } from './tokeniser.js';
import { parse } from './parser.js';

export function compile(sourceCode) {
  // Tokenise the source code
  const tokens = tokenise(sourceCode);
  // Parse the tokens into an AST
  const ast = parse(tokens);
  // Generate JavaScript code from the AST
  const javascriptCode = generateJavaScript(ast);
  return javascriptCode;
}

export function generateJavaScript(ast) {
  const generateNode = (node) => {
    if (!node) return '';

    switch (node.type) {
      case 'Program':
        return (node.body || [])
          .map((stmt) => generateNode(stmt))
          .filter(Boolean)
          .join('\n');

      case 'NumberLiteral':
        return String(node.value);

      case 'StringLiteral':
        return JSON.stringify(node.value);

      case 'Identifier':
        return node.name;

      case 'ArrayExpression':
        return `[${(node.elements || []).map((el) => generateNode(el)).join(', ')}]`;

      case 'MemberExpression':
        return `${generateNode(node.object)}[${generateNode(node.property)}]`;

      case 'BinaryExpression':
        return `${generateNode(node.left)} ${node.operator} ${generateNode(node.right)}`;

      case 'AssignmentExpression':
        return `${generateNode(node.left)} = ${generateNode(node.right)};`;

      case 'VariableDeclaration': {
        const declaration = node.declarations?.[0];
        if (!declaration) return '';
        const id = generateNode(declaration.id);
        const init = declaration.init ? ` = ${generateNode(declaration.init)}` : '';
        return `let ${id}${init};`;
      }

      case 'ReturnStatement': {
        const arg = node.argument ? ` ${generateNode(node.argument)}` : '';
        return `return${arg};`;
      }

      case 'PrintStatement': {
        const arg = node.argument ? generateNode(node.argument) : '';
        return `console.log(${arg});`;
      }

      case 'IfStatement': {
        const test = generateNode(node.test);
        const consequent = generateNode(node.consequent);
        const alternate = node.alternate ? generateNode(node.alternate) : '';
        if (alternate) {
          return `if (${test}) {\n  ${consequent}\n} else {\n  ${alternate}\n}`;
        }
        return `if (${test}) {\n  ${consequent}\n}`;
      }

      case 'WhileStatement': {
        const test = generateNode(node.test);
        const body = generateNode(node.body);
        return `while (${test}) {\n  ${body}\n}`;
      }

      case 'ForStatement': {
        const init = node.init ? generateNode(node.init).replace(/;$/, '') : '';
        const test = node.test ? generateNode(node.test).replace(/;$/, '') : '';
        const update = node.update ? generateNode(node.update).replace(/;$/, '') : '';
        const body = generateNode(node.body);
        return `for (${init}; ${test}; ${update}) {\n  ${body}\n}`;
      }

      default:
        return '';
    }
  };

  return generateNode(ast);
}

// compile is the main function that will be called to compile the source code
// sourceCode is a parameter, it is a variable that will HOLD whatever code string you pass in later 
// for example, complie("(add 2 2 ") - here is the argument, and inside the function, it becomes the parameter sourceCode

// const tokens is a LOCAL VARIABLE that will HOLD the result of the tokenise function
// it only exists while the compile() function is running
// tokenise is a function and returns an array of token objects 
// tokens = result of running tokenise on sourceCode

// Mental model .... 
// String to tokenise() -> array of token objects
// tokens -> parse() -> AST object 
// AST object -> generateJavaScript() -> JavaScript string


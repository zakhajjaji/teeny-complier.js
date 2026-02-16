
import { compileStepByStep } from './compiler.js';

const result = compileStepByStep('let x = 5');
console.log('Result of the TypeScript wrapper test:');
console.log('Tokens:', result.tokens.length);
console.log('AST:', result.ast.type);
console.log('Output:', result.javascriptCode);

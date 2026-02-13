const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [
   'for(let i = 0; i < 10; i++) return 5', 
   'for(; i < 10; i++) return 5',
   'for(let i = 0; ; i++) return 5',
   'for(let i = 0; i < 10;) return 5',
   'for(let i = 0; i < 10; i++) { print(i); }', // WILL FAIL BECAUSE BLOCK PARSIN {...} IS NOT IMPLEMENTED YET. 
]; 

console.log('Testing ForStatement parsing ...\n');

testCases.forEach((sourceCode, index) => {
   console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`); 

   try {
      const token = tokenise(sourceCode); 
      console.log('Tokens:', token.map(t => `${t.type}:${t.value}`).join(' '));

      const ast = parse(token); 
      console.log('AST:', JSON.stringify(ast, null, 2)); 

      const nodeType = ast.body && ast.body[0] ? ast.body[0].type : 'unknown';
      if (nodeType === 'ForStatement') {
         console.log('Success: ForStatement');
      } else {
         console.log(`Failure: expected ForStatement, got ${nodeType}`);
      }
   } catch (error) {
      console.error('Error:', error.message);
   }
});

console.log('\n=== All tests completed for ForStatement ===\n');
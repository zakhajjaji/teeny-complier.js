const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [
    'return 5',
    'return "hello"',
    'return [1, 2, 3]',
    'return 1 + 2',
    'return "hello" + "world"',
    'return [1, 2, 3][0]',
    'return 1 + 2; return 3 + 4;',
    'return 1 + 2; return 3 + 4; return 5 + 6;',
]

console.log('Testing ReturnStatement parsing...\n');

testCases.forEach((sourceCode, index) => {
        console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' '));

        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body && ast.body[0] ? ast.body[0].type : 'unknown';
        if (nodeType === 'ReturnStatement') {
            const argumentType = ast.body[0].argument ? ast.body[0].argument.type : 'null';
            console.log(`Success: ReturnStatent with ${argumentType} argument`);
        } else {
            console.log(`Failture: expected ReturnStatement, got ${nodeType}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('\n=== All test completed ===');
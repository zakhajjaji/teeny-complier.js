const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [
    'if(x > 5) return 5;',
    'if(x = 5) return 5;',
];

console.log('Testing IfStatement parsing ...\n');

testCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`)

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' '));

        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body && ast.body[0] ? ast.body[0].type : 'unknown';
        if (nodeType === 'IfStatement') {
            const testType = ast.body[0].test ? ast.body[0].test.type : 'null';
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
})
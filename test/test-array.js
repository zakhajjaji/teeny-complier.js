const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [
    '[1, 2, 3]',
    '[1]', 
    '[]',
    '["hello", "world"]',
    '["hello", "world", 1, 2, 3]',
    '[1, 2, 3][0]',
]

testCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index +1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));

        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        if(ast.body && ast.body[0] && ast.body[0].type === 'ArrayExpression') {
        console.log(`Success: parsed ${ast.body[0].elements.length} element(s))`);
        } else {
            console.log(`Failure: expected ArrayExpression, got ${ast.body[0].type}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }   
});

console.log('\n=== All tests completed ===');
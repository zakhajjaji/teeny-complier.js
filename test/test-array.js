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

        const nodeType = ast.body[0].type;
        if (nodeType === 'ArrayExpression') {
            console.log(`Success: ArrayExpression with ${ast.body[0].elements.length} element(s)`);
        } else if (nodeType === 'MemberExpression') {
            console.log(`Success: MemberExpression (object: ${ast.body[0].object.type}, property: ${ast.body[0].property.value})`);
        } else {
            console.log(`Failure: expected ArrayExpression, or MemberExpression, got ${nodeType}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }   
});

console.log('\n=== All tests completed ===');
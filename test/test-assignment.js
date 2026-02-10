const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [ 
    'x = 5',
    'arr = [1, 2, 3]',
    'arr[0] = 10',
    'x = y = 5', // chained assignment
    'name = "hello"'
]; 

console.log('Testing AssignmentExpression parsing...\n');

testCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' '));

        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body && ast.body[0] ? ast.body[0].type : 'unknown'; 

        if (nodeType === 'AssignmentExpression') {
            const leftType = ast.body[0].left.type;
            const rightType = ast.body[0].right.type;
            console.log(`Success: AssignmentExpression (left: ${leftType}, right: ${rightType})`);
        } else {
            console.log(`Failure: expected AssignmentExpression, got ${nodeType}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('\n=== All test completed ===');
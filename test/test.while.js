const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const testCases = [
    'while (true) return 5;',
    'while (x > 5) return 5;',
];

console.log('Testing WhileStatement parsing...\n');

testCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode); 
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}.`).join(' '));

        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2)); 

        const nodeType = ast.body && ast.body[0] ? ast.body[0].type : 'unknown';
        if (nodeType === 'WhileStatement') {
            const whileTestType = ast.body[0].test ? ast.body[0].test.type : 'null';
            const whileBodyType = ast.body[0].body ? ast.body[0].body.type : 'null';
            console.log(`Success: WhileStatement with test type ${whileTestType} and body type ${whileBodyType}`);
        } else {
            console.log(`Failure: expected WhileStatement, got ${nodeType}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
})

console.log('\n=== All test completed ===.');
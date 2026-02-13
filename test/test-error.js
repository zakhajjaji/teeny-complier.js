const { parse } = require('../src/parser');
const { tokenise } = require('../src/tokeniser');

const errorTestCases = [
    {
        name: 'Missing opening parenthesis in while',
        code: 'while x > 5) return 5;',
        expectedError: 'Expected ( after while condition'
    },
    {
        name: 'Missing closing parenthesis in while',
        code: 'while (x > 5 return 5;',
        expectedError: 'Expected ) after while condition'
    },
    {
        name: 'Empty condition in while',
        code: 'while () return 5;',
        expectedError: 'Expected expression after while condition'
    },
    {
        name: 'Missing opening parenthesis in if',
        code: 'if x > 5) return 5;',
        expectedError: 'Expected ( after if condition'
    },
    {
        name: 'Missing semicolon in for loop',
        code: 'for(let i = 0 i < 10; i++) return 5;',
        expectedError: 'Expected ; after test expression'
    }
];

console.log('Testing error handling...\n');

errorTestCases.forEach((testCase, index) => {
    console.log(`\n=== Error Test ${index + 1}: ${testCase.name} ===`);
    console.log(`Code: ${testCase.code}`);
    console.log(`Expected Error: ${testCase.expectedError}`);

    try {
        const tokens = tokenise(testCase.code);
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' '));

        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));
        console.log('Failed: Expected error, but parsing succeeded');
    } catch (error) {
        console.error('Error:', error.message);
        if(error.message.includes(testCase.expectedError)) {
            console.log('Success: Error CAUGHT as expected!!');
        } else {
            console.log(`Error message doesn't match expected: "${testCase.expectedError}"`);
        }
    }
});

console.log('\nAll error tests completed.');
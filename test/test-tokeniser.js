const { tokenise } = require('../src/tokeniser');

const integerTestCases = [
    '1, 2, 3',
    '1 + 2', 
    '1 - 2',
    '1 + 1 + 1',
] 

const stringTestCases = [
    '"hello"',
    '"hello" + "world"',
]

const identifierTestCases = [
    'x',
    'y',
    'z',
]

const operatorTestCases = [
    '+',
    '-',
    '*',
    '/',
    '=',
    '<',
    '>',
    '!',
]

const punctuationTestCases = [
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    ',',
    '.',
    ';',
    ':',
    '?',
]

const whitespaceTestCases = [
    ' ',
    '\t',
    '\n',
]

const keywordTestCases = [
    'let',
    'func',
    'if',
    'else',
    'return',
]

console.log('Testing integer tokenisation...\n');

integerTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode); 
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));

        if(tokens.length > 0 && tokens[0].type === 'NUMBER') {
            console.log('Success: NUMBER token');
        } else {
            console.log(`Failure: expected NUMBER token, got ${tokens[0]?.type || 'empty'}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing string tokenisation...\n');

stringTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`); 

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        if (index === 0) {
            // Test 1: Single string
            if (tokens.length === 1 && tokens[0].type === 'STRING') {
                console.log('Success: Single STRING token');
            }
        } else {
            // Test 2: String + operator + string
            if (tokens.length === 3 && tokens[0].type === 'STRING' && 
                tokens[1].type === 'OPERATOR' && tokens[2].type === 'STRING') {
                console.log('Success: STRING + OPERATOR + STRING');
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing identifier tokenisation...\n');

identifierTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);
    
    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));

        if (tokens.length > 0 && tokens[0]?.type === 'IDENTIFIER') {
            console.log('Success: IDENTIFIER token');
        } else {
            console.log(`Failure: expected IDENTIFIER token ${tokens[0]?.type || 'empty'}`)
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
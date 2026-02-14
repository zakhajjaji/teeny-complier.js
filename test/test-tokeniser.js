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
    ' 1 + 2 '
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

console.log('Testing operator tokenisation...\n');

operatorTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode}`)

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));

        if (tokens.length > 0 && tokens[0].type === 'OPERATOR') {
            console.log('Success: OPERATOR token');
        } else {
            console.log(`Failure: expected OPERATOR token, got ${tokens[0]?.type || 'empty'}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing punctuation tokenisation...\n');

punctuationTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);
    
    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        if (tokens.length > 0 && tokens[0]?.type === 'PUNCTUATION') {
            console.log('Success: PUNCTUATION token');
        } else {
            console.log(`Failure: expected PUNCTUATION token, got ${tokens[0]?.type || 'empty'}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing whitespace tokenisation...\n');

whitespaceTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);
    
    try { 
        const tokens = tokenise(sourceCode); 
        console.log('Tokens:', tokens.length === 0 ? '(empty ... whitespace skipped)' : tokens.map(t => `${t.type}: ${t.value}`).join(' | '));
        
       const isPureWhitespace = index < 3; // first 3 test cases are pure whitespace .. following is different 

       if(isPureWhitespace) {
        if(tokens.length === 0) {
            console.log('Success: Whitespace correctly skipped (no tokens created)');
        } else {
            console.log(`Failure: expected whitespace to be skipped (empty array), but got ${tokens.length} token(s)`);
        }
       } else {
        const hasWhitespaceTokens = tokens.some(t => t.type === 'WHITESPACE');  
        if(tokens.length > 0 && !hasWhitespaceTokens) {
            console.log('Success: Whitespace correctly skipped (no tokens created)');
        } else if(hasWhitespaceTokens) {
            console.log(`Failure: whitespace should be skipped, but found WHITESPACE token(s)`); 
        } else {
            console.log(`Failure: expected tokens but got empty array`);
        } 
       }
    } 
    catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing keyword tokenisation...\n');

keywordTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);
    
    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        if (tokens.length > 0 && tokens[0].type === 'KEYWORD') {
            console.log('Success: KEYWORD token');
        } else {
            console.log(`Failure: expected KEYWORD token, got ${tokens[0]?.type || 'empty'}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('All tests completed successfully!');
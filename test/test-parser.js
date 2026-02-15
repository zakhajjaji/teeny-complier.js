const { tokenise } = require('../src/tokeniser');
const { parse } = require('../src/parser');

// Complete list of AST node types: 
// Program — root node (always wraps everything)
// NumberLiteral — numbers like 1, 42
// StringLiteral — strings like "hello"
// Identifier — variable names like x, myVar
// BinaryExpression — operations like 1 + 2, x * y
// ArrayExpression — arrays like [1, 2, 3]
// MemberExpression — array access like arr[0]
// AssignmentExpression — assignments like x = 5
// VariableDeclaration — declarations like let x = 5
// ReturnStatement — return statements like return 5
// IfStatement — if statements
// WhileStatement — while loops
// ForStatement — for loops

// 1. Test for number literals

const numberLiteralTestCases = [
    '1',
    '42',
    '100',
    '102023',
]

const stringLiteralTestCases = [
    '"hello"',
    '"world"',
    '""',  // Empty string to test for empty string literal
    '"test123"',
]

const binaryExpressionTestCases = [
   { sourceCode: '1 + 1', operator: '+', leftValue: 1, rightValue: 1 },
   { sourceCode: '1 - 1', operator: '-', leftValue: 1, rightValue: 1 },
   { sourceCode: '1 * 1', operator: '*', leftValue: 1, rightValue: 1 },
   { sourceCode: '1 / 1', operator: '/', leftValue: 1, rightValue: 1 },
   { sourceCode: '2 + 3', operator: '+', leftValue: 2, rightValue: 3 },
   { sourceCode: '"hello" + "world"', operator: '+', leftValue: 'hello', rightValue: 'world' },
]

const arrayExpressionTestCases = [
    { sourceCode: '[1, 2, 3]', elements: [1, 2, 3] },
    { sourceCode: '[1]', elements: [1] },
    { sourceCode: '[]', elements: [] },
    { sourceCode: '["hello", "world"]', elements: ['hello', 'world'] },
    { sourceCode: '["hello", "world", 1, 2, 3]', elements: ['hello', 'world', 1, 2, 3] },
]

const identifierTestCases = [
    'x',
    'y',
    'z',
    'myVar'
]

console.log('Testing number literal parsing...\n');

numberLiteralTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`); 
    try {
        const tokens = tokenise(sourceCode); 
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2)); 

        const expectedValue = parseInt(sourceCode); 
        const nodeType = ast.body[0]?.type; 
        const nodeValue = ast.body[0]?.value;

        if (nodeType === 'NumberLiteral' && nodeValue === expectedValue) {
            console.log(`Success: ${nodeType} with value ${nodeValue}`);
        } else {
            console.log(`Failure: expected NumberLiteral with expected value of ${expectedValue}, and got ${nodeType}${nodeValue !== undefined ? ` with value ${nodeValue}` : ''} instead`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing string literal parsing...\n');

stringLiteralTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`); 

try { 
    const tokens = tokenise(sourceCode); 
    console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
    const ast = parse(tokens); 
    console.log('ASTL:', JSON.stringify(ast, null, 2)); 

    const expectedValue = sourceCode.slice(1, -1);
    const nodeType = ast.body[0]?.type; 
    const nodeValue = ast.body[0]?.value;

    if(nodeType === 'StringLiteral' && nodeValue === expectedValue) {
        console.log(`Success: ${nodeType} with value ${nodeValue}`)
    } else {
        console.log(`Failure: expected StringLiteral with expected value of "${expectedValue}", and got ${nodeType}${nodeValue !== undefined ? ` with value "${nodeValue}"` : ''} instead`);
    }
} catch (error) {
    console.error('Error:', error.message);
}
});

console.log('Testing operator expression literal parsing...\n');

binaryExpressionTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2)); 

        const nodeType = ast.body[0]?.type;
        const nodeOperator = ast.body[0]?.operator;
        const nodeLeftValue = ast.body[0]?.left?.value;
        const nodeRightValue = ast.body[0]?.right?.value; 

        if (nodeType === 'BinaryExpression' && nodeOperator === sourceCode.operator && nodeLeftValue === sourceCode.leftValue && nodeRightValue === sourceCode.rightValue) {
            console.log(`Success: ${nodeType} with operator ${nodeOperator}, left=${nodeLeftValue}, right=${nodeRightValue}`);
        } else {
            console.log(`Failure: expected BinaryExpression with operator ${sourceCode.operator}, left=${sourceCode.leftValue}, right=${sourceCode.rightValue}, got ${nodeType}${nodeOperator ? ` with operator ${nodeOperator}` : ''}${nodeLeftValue !== undefined ? `, left=${nodeLeftValue}` : ''}${nodeRightValue !== undefined ? `, right=${nodeRightValue}` : ''}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing array expression literal parsing...\n');

arrayExpressionTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body[0]?.type;
        const nodeElements = ast.body[0]?.elements;

        if(nodeType === 'ArrayExpression' && nodeElements.length === sourceCode.elements.length && nodeElements.every((element, index) => element.value === sourceCode.elements[index])) {
            console.log(`Success: ${nodeType} with ${nodeElements.length} elements: ${nodeElements.map(e => e.value).join(', ')}`);
        } else {
            console.log(`Failure: expected ArrayExpression with ${sourceCode.elements.length} elements: ${sourceCode.elements.join(', ')}, got ${nodeType}${nodeElements !== undefined ? ` with ${nodeElements.length} elements: ${nodeElements.map(e => e.value).join(', ')}` : ''}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing identifier literal parsing...\n');

identifierTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        const expectedName = sourceCode;
        const nodeType = ast.body[0]?.type;
        const nodeName = ast.body[0]?.name;

        if(nodeType === 'Identifier' && nodeName === sourceCode) {
            console.log(`Success: ${nodeType} with name ${nodeName}`);
        } else {
            console.log(`Failure: expected Identifier with name ${sourceCode}, got ${nodeType}${nodeName !== undefined ? ` with name ${nodeName}` : ''}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
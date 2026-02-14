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
]

console.log('Testing number literal parsing...\n');

numberLiteralTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode} ===`); 
    try {
        const tokens = tokenise(sourceCode); 
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));

        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2)); 

        const nodeType = ast.body[0].type; 
        const nodeValue = ast.body[0].value; 
        console.log(`Success: ${nodeType} with value ${nodeValue}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
});
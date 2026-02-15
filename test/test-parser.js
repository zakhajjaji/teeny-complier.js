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

const memberExpressionTestCases = [
    { sourceCode: 'arr[0]', object: 'arr', property: 0 },
    { sourceCode: 'arr[1]', object: 'arr', property: 1 },
    { sourceCode: 'myArray[5]', object: 'myArray', property: 5 },
    { sourceCode: 'x[10]', object: 'x', property: 10 },
]

const assignmentExpressionTestCases = [
    { sourceCode: 'x = 5', leftType: 'Identifier', leftName: 'x', operator: '=', rightType: 'NumberLiteral', rightValue: 5 },
    { sourceCode: 'arr[0] = 10', leftType: 'MemberExpression', leftObject: 'arr', leftProperty: 0, operator: '=', rightType: 'NumberLiteral', rightValue: 10 },
    { sourceCode: 'myArray[5] = 20', leftType: 'MemberExpression', leftObject: 'myArray', leftProperty: 5, operator: '=', rightType: 'NumberLiteral', rightValue: 20 },
    { sourceCode: 'x[10] = 30', leftType: 'MemberExpression', leftObject: 'x', leftProperty: 10, operator: '=', rightType: 'NumberLiteral', rightValue: 30 },
]

const returnStatementTestCases = [
    { sourceCode: 'return 5', value: 5 },
    { sourceCode: 'return "hello"', value: 'hello' },
    { sourceCode: 'return arr[0]', value: 'arr[0]' },
    { sourceCode: 'return myArray[5]', value: 'myArray[5]' },
    { sourceCode: 'return x[10]', value: 'x[10]' },
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

console.log('Testing member expression literal parsing...\n');

memberExpressionTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body[0]?.type;
        const nodeObject = ast.body[0]?.object;
        const nodeProperty = ast.body[0]?.property;

        if(nodeType === 'MemberExpression' && nodeObject.type === 'Identifier' && nodeObject.name === sourceCode.object && nodeProperty.type === 'NumberLiteral' && nodeProperty.value === sourceCode.property) {
            console.log(`Success: ${nodeType} with object ${nodeObject.name}, property ${nodeProperty.value}`);
        } else {
            console.log(`Failure: expected MemberExpression with object ${sourceCode.object}, property ${sourceCode.property}, got ${nodeType}${nodeObject !== undefined ? ` with object ${nodeObject.name}` : ''}${nodeProperty !== undefined ? `, property ${nodeProperty.value}` : ''}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing assignment expression literal parsing...\n');

assignmentExpressionTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}: ${t.value}`).join(' '));
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));
        
        const nodeType = ast.body[0]?.type;
        const nodeLeftType = ast.body[0]?.left?.type;
        const nodeLeftName = ast.body[0]?.left?.name; // For Identifier
        const nodeLeftObject = ast.body[0]?.left?.object?.name; // For MemberExpression
        const nodeLeftProperty = ast.body[0]?.left?.property?.value; // For MemberExpression
        const nodeOperator = ast.body[0]?.operator; 
        const nodeRightType = ast.body[0]?.right?.type;     
        const nodeRightValue = ast.body[0]?.right?.value;

        // Check Identifier case
        const identifierMatch = nodeLeftType === 'Identifier' && 
                               nodeLeftName === sourceCode.leftName &&
                               nodeOperator === sourceCode.operator &&
                               nodeRightType === sourceCode.rightType &&
                               nodeRightValue === sourceCode.rightValue;

        // Check MemberExpression case
        const memberExpressionMatch = nodeLeftType === 'MemberExpression' &&
                                      nodeLeftObject === sourceCode.leftObject &&
                                      nodeLeftProperty === sourceCode.leftProperty &&
                                      nodeOperator === sourceCode.operator &&
                                      nodeRightType === sourceCode.rightType &&
                                      nodeRightValue === sourceCode.rightValue;

        if (nodeType === 'AssignmentExpression' && (identifierMatch || memberExpressionMatch)) {
            if (nodeLeftType === 'Identifier') {
                console.log(`Success: ${nodeType} with left ${nodeLeftType} ${nodeLeftName}, operator ${nodeOperator}, right ${nodeRightType} ${nodeRightValue}`);
            } else {
                console.log(`Success: ${nodeType} with left ${nodeLeftType} ${nodeLeftObject}[${nodeLeftProperty}], operator ${nodeOperator}, right ${nodeRightType} ${nodeRightValue}`);
            }
        } else {
            if (sourceCode.leftType === 'Identifier') {
                console.log(`Failure: expected AssignmentExpression with left ${sourceCode.leftType} ${sourceCode.leftName}, operator ${sourceCode.operator}, right ${sourceCode.rightType} ${sourceCode.rightValue}, got ${nodeType}${nodeLeftType !== undefined ? ` with left ${nodeLeftType} ${nodeLeftName}` : ''}${nodeOperator !== undefined ? `, operator ${nodeOperator}` : ''}${nodeRightType !== undefined ? `, right ${nodeRightType} ${nodeRightValue}` : ''}`);
            } else {
                console.log(`Failure: expected AssignmentExpression with left ${sourceCode.leftType} ${sourceCode.leftObject}[${sourceCode.leftProperty}], operator ${sourceCode.operator}, right ${sourceCode.rightType} ${sourceCode.rightValue}, got ${nodeType}${nodeLeftType !== undefined ? ` with left ${nodeLeftType} ${nodeLeftObject}[${nodeLeftProperty}]` : ''}${nodeOperator !== undefined ? `, operator ${nodeOperator}` : ''}${nodeRightType !== undefined ? `, right ${nodeRightType} ${nodeRightValue}` : ''}`);
            }
        }
    } catch (error) {
            console.error('Error:', error.message);
        }
    });
    
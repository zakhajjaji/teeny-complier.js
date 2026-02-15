const { tokenise } = require('../src/tokeniser');
const { parse } = require('../src/parser');


// VariableDeclaration — declarations like let x = 5
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
    { sourceCode: 'return arr[0]', argumentType: 'MemberExpression', argumentObject: 'arr', argumentProperty: 0 },
    { sourceCode: 'return myArray[5]', argumentType: 'MemberExpression', argumentObject: 'myArray', argumentProperty: 5 },
    { sourceCode: 'return x[10]', argumentType: 'MemberExpression', argumentObject: 'x', argumentProperty: 10 },
    { sourceCode: 'return 5', argumentType: 'NumberLiteral', argumentValue: 5 },
    { sourceCode: 'return "hello"', argumentType: 'StringLiteral', argumentValue: 'hello' },
]

const variableDeclarationTestCases = [
    { sourceCode: 'let x = 5', idName: 'x', initType: 'NumberLiteral', initValue: 5 },
    { sourceCode: 'let y = "hello"', idName: 'y', initType: 'StringLiteral', initValue: 'hello' },
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
        const nodeLeftName = ast.body[0]?.left?.name; // For identifier
        const nodeLeftObject = ast.body[0]?.left?.object?.name; // For member expression
        const nodeLeftProperty = ast.body[0]?.left?.property?.value; // For member expression
        const nodeOperator = ast.body[0]?.operator; 
        const nodeRightType = ast.body[0]?.right?.type;     
        const nodeRightValue = ast.body[0]?.right?.value;

        // checks for identifier case, important for this assingment.
        const identifierMatch = nodeLeftType === 'Identifier' && 
                               nodeLeftName === sourceCode.leftName &&
                               nodeOperator === sourceCode.operator &&
                               nodeRightType === sourceCode.rightType &&
                               nodeRightValue === sourceCode.rightValue;

        // checks for member expression case. 
        const memberExpressionMatch = nodeLeftType === 'MemberExpression' && nodeLeftObject === sourceCode.leftObject && nodeLeftProperty === sourceCode.leftProperty && nodeOperator === sourceCode.operator && nodeRightType === sourceCode.rightType && nodeRightValue === sourceCode.rightValue;

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

console.log('Testing return statement literal parsing...\n');

returnStatementTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode); 
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' ')); 
        const ast = parse(tokens); 
        console.log('AST:', JSON.stringify(ast, null, 2)); 
    
        const nodeType = ast.body[0]?.type;
        const nodeArgumentType = ast.body[0]?.argument?.type;
        const nodeArgumentObject = ast.body[0]?.argument?.object?.name;
        const nodeArgumentProperty = ast.body[0]?.argument?.property?.value;
        const nodeArgumentValue = ast.body[0]?.argument?.value;
        const nodeArgumentName = ast.body[0]?.argument?.name;
      
        const argumentName = sourceCode.argumentName;
        const argumentObject = sourceCode.argumentObject;
        const argumentProperty = sourceCode.argumentProperty;
        const argumentValue = sourceCode.argumentValue;     
        const argumentType = sourceCode.argumentType;

        const identifierMatch = nodeArgumentType === 'Identifier' && nodeArgumentName === argumentName;
        const memberExpressionMatch = nodeArgumentType === 'MemberExpression' && nodeArgumentObject === argumentObject && nodeArgumentProperty === argumentProperty;

        const numberLiteralMatch = nodeArgumentType === 'NumberLiteral' && nodeArgumentValue === argumentValue;
        const stringLiteralMatch = nodeArgumentType === 'StringLiteral' && nodeArgumentValue === argumentValue;
   
        if (nodeType === 'ReturnStatement' && (identifierMatch || memberExpressionMatch || numberLiteralMatch || stringLiteralMatch)) {
            console.log(`Success: ${nodeType} with argument ${nodeArgumentType} ${nodeArgumentObject !== undefined ? `[${nodeArgumentProperty}]` : ''}${nodeArgumentValue !== undefined ? ` ${nodeArgumentValue}` : ''}`);
        } else {
            console.log(`Failure: expected ReturnStatement with argument ${nodeArgumentType} ${nodeArgumentName}${nodeArgumentObject !== undefined ? `[${nodeArgumentProperty}]` : ''}${nodeArgumentValue !== undefined ? ` ${nodeArgumentValue}` : ''}, got ${nodeType}${nodeArgumentType !== undefined ? ` with argument ${nodeArgumentType} ${nodeArgumentName}${nodeArgumentObject !== undefined ? `[${nodeArgumentProperty}]` : ''}${nodeArgumentValue !== undefined ? ` ${nodeArgumentValue}` : ''}` : ''}${nodeArgumentObject !== undefined ? `, argument ${nodeArgumentObject}` : ''}${nodeArgumentProperty !== undefined ? `, argument ${nodeArgumentProperty}` : ''}${nodeArgumentValue !== undefined ? `, argument ${nodeArgumentValue}` : ''}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log('Testing variable declaration literal parsing...\n');

variableDeclarationTestCases.forEach((sourceCode, index) => {
    console.log(`\n=== Test ${index + 1}: ${sourceCode.sourceCode} ===`);

    try {
        const tokens = tokenise(sourceCode.sourceCode);
        console.log('Tokens:', tokens.map(t => `${t.type}:${t.value}`).join(' '));
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        const nodeType = ast.body[0]?.type;
        const nodeIdName = ast.body[0]?.declarations[0]?.id?.name;  
        const nodeInitType = ast.body[0]?.declarations[0]?.init?.type;  
        const nodeInitValue = ast.body[0]?.declarations[0]?.init?.value;  
        const nodeInitObject = ast.body[0]?.declarations[0]?.init?.object?.name;
        const nodeInitProperty = ast.body[0]?.declarations[0]?.init?.property?.value;

        const literalMatch = (nodeInitType === 'NumberLiteral' || nodeInitType === 'StringLiteral') && 
                    nodeIdName === sourceCode.idName && 
                    nodeInitType === sourceCode.initType && 
                    nodeInitValue === sourceCode.initValue;
        if (nodeType === 'VariableDeclaration' && literalMatch) {
                        console.log(`Success: ${nodeType} with id ${nodeIdName}, init ${nodeInitType} ${nodeInitValue}`);
         } else {
            console.log(`Failure: expected VariableDeclaration with id ${sourceCode.idName}, init ${sourceCode.initType} ${sourceCode.initValue}, got ${nodeType}${nodeIdName !== undefined ? ` with id ${nodeIdName}` : ''}${nodeInitType !== undefined ? `, init ${nodeInitType} ${nodeInitValue}` : ''}${nodeInitValue !== undefined ? `, init ${nodeInitValue}` : ''}${nodeInitObject !== undefined ? `, init ${nodeInitObject}[${nodeInitProperty}]` : ''}${nodeInitProperty !== undefined ? `, init ${nodeInitProperty}` : ''}`);
         }
            } catch (error) {
                        console.error('Error:', error.message);
                    }
                }); 
// Lexical analysis ... tokeniser

function isDigit(char) {
    return char >= '0' && char <= '9'; // check if the character is a digit
}

function isLetter(char) {
    return (char >= 'a' && char <= 'z') 
    || (char >= 'A' && char <= 'Z'); // check if the character is a letter
}

function isWhitespace(char) {
    return char === ' ' || char === '\t' || char === '\n' || cjar === '\r'; // check if the character is a whitespace
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%', '=', '==', '!=', '>', '<', '>=', '<=', '&&', '||', '!', '(', ')', '{', '}', '[', ']', ';', ',', ':', '.', '<', '>', '\'', '\"', '`'].includes(char); // check if the character is an operator
}

function isKeyword(char) {
    return [].includes(char); 
    // check if the character is a keyword
}

function isIdentifier(char) {
    return isLetter(char) || isDigit(char) || char === '_'; // check if the character is an identifier
}

function isString(char) {
    return char === '"' || char === '\''; // check if the character is a string
}

function isNumber(char) {
    return isDigit(char) || char === '.'; // check if the character is a number
}

function isBoolean(char) {
    return ['true', 'false'].includes(char); // this checks if the character is a boolean
}

function isNull(char) {
    return char === 'null'; // this checks if the character is null
}

function isUndefined(char) {
    return char === 'undefined'; // this checks if the character is undefined
}

function isComment(char) {
    return char === '//' || char === '/*' || char === '*/'; // this checks if the character is a comment
}


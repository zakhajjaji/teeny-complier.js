// Lexical analysis ... tokeniser

function isDigit(char) {
  return char >= "0" && char <= "9"; // check if the character is a digit
}

function isLetter(char) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z"); // check if the character is a letter
}

function isWhitespace(char) {
  return char === " " || char === "\t" || char === "\n" || char === "\r"; // check if the character is a whitespace
}

function isIdentifier(char) {
  return isLetter(char) || isDigit(char) || char === "_"; // check if the character is an identifier
}

function isString(char) {
  return char === '"' || char === "'"; // check if the character is a string
}

function isDecimal(char) {
  return isDigit(char) || char === "."; // check if the character is a decimal
}

// Simple read function that reads numbers first
function readNumber(source, start) {
  let current = start;
  let value = "";

  // read the number until the end of the number
  while (current < source.length && isDigit(source[current])) {
    value += source[current];
    current++;
  }

  return {
    token: { type: "NUMBER", value: parseFloat(value) },
    nextPosition: current,
  };
}

// function functionName(param1, param2) {
//     let pointer = param2; 
//     let buffer = ''; 
//     while(pointer < param1.length && condition(param1[pointer])) {
//         buffer += param1[pointer]; 
//         pointer++; 
//     }
//     return {
//         token: { type: "TYPE", value: transform(buffer) }, 
//         nextPosition: pointer, 
//     }; 
// }


function readIdentifier(source, start) { // takes the full text and where a word begins
    let current = start; 
    let value = ''; 

    while (current < source.length && (isLetter(source[current]) || isDigit(source[current]))) {
        value += source[current]; 
        current++; 
    }

    // checking if its a key word 
    const keywords = ['let', 'func', 'if', 'else', 'return', 'print'];
    const type = keywords.includes(value) ? 'KEYWORD' : 'IDENTIFIER';
    return {
        token: { type: type, value }, 
        nextPosition: current, 
    }; 
}
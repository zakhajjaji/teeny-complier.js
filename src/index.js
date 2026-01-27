// Main compiler entry point

const { tokenise } = require('./tokeniser');

function compile(sourceCode) {
    // Tokenise the source code
    const tokens = tokenise(sourceCode);
    // Parse the tokens into an AST
    const ast = parse(tokens);
    // Generate JavaScript code from the AST
    const javascriptCode = generateJavaScript(ast);
    return javascriptCode;
}

function tokenise(sourceCode) {
    const tokens = [];
    return tokens;
}

function parse(tokens) {
    const ast = [];
    return ast;
}

function traverse(ast) {
    const javascriptCode = [];
    return javascriptCode;
}

function generateJavaScript(ast) {
    const javascriptCode = [];
    return javascriptCode;
}



// compile is the main function that will be called to compile the source code
// sourceCode is a parameter, it is a variable that will HOLD whatever code string you pass in later 
// for example, complie("(add 2 2 ") - here is the argument, and inside the function, it becomes the parameter sourceCode

// const tokens is a LOCAL VARIABLE that will HOLD the result of the tokenise function
// it only exists while the compile() function is running
// tokenise is a function and returns an array of token objects 
// tokens = result of running tokenise on sourceCode

// Mental model .... 
// String to tokenise() -> array of token objects
// tokens -> parse() -> AST object 
// AST object -> generateJavaScript() -> JavaScript string


const { tokenise } = require('../../src/tokeniser.js');
const { parse } = require('../../src/parser.js');
const { compile, generateJavaScript } = require('../../src/index.js');

function compileStepByStep(sourceCode) {
    const tokens = tokenise(sourceCode);        // Use the imported tokenise
    const ast = parse(tokens);                  // Use the imported parse
    const javascriptCode = generateJavaScript(ast);  // Use the imported generateJavaScript
    return {
        tokens,
        ast,
        javascriptCode
    };
}
module.exports = { tokenise, parse, compile, compileStepByStep };


// Backend (src/)
//     ↓ require()
// compiler.js (bridge)
//     ↓ require()
// compiler.ts (TypeScript wrapper)
//     ↓ import
// React Component
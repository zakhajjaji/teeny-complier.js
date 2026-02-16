const { tokenise } = require('../../src/tokeniser.js');
const { parse } = require('../../src/parser.js');
const { generateJavaScript } = require('../../src/index.js');

function compileStepByStep(sourceCode) {
    const tokens = tokenise(sourceCode);
    const ast = parse(tokens);
    const javascriptCode = generateJavaScript(ast);
    return {
        tokens,
        ast,
        javascriptCode,
    }
}
module.exports = { compileStepByStep };

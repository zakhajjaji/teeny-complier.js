import { tokenise } from '../../src/tokeniser.js';
import { parse } from '../../src/parser.js';
import { compile, generateJavaScript } from '../../src/index.js';

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
export { tokenise, parse, compile, compileStepByStep };


// Backend (src/)
//     ↓ require()
// compiler.js (bridge)
//     ↓ require()
// compiler.ts (TypeScript wrapper)
//     ↓ import
// React Component
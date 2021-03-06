const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('supports 1', t => {
    const actual = `@supports (animation-name: test) {
        @keyframes loading {
            0% { top: 0; left: 0; }
            2% { top: 50px; left: 25px; }
            100% { top: 100px; left: 100%; }
        }
    }`;
    const expected = ['@supports (animation-name: test) {@keyframes loading{0%{top: 0;left: 0;} 2%{top: 50px;left: 25px;} 100%{top: 100px;left: 100%;}}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('supports 2', t => {
    const actual = `@supports (--foo: green) {
        body {
            color: green;
        }
    }`;
    const expected = ['@supports (--foo: green){body{color: green;}}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

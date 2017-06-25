const postcss = require('postcss');
const parsers = require('./parsers');
const stringify = require('./utils').stringify;

// isSimple doesn't make much sense
// needs to be simplified (yes the irony)
const isSimple = require('./utils').isSimple;

const cssrules = (css) => {
    return postcss()
        .process(css)
        .then(result => {
            return parsers.root(result.root)
                .map(data => {
                    if (isSimple(data)) {
                        return stringify.simple(
                            data.selector,
                            data.params
                        );
                    } else {
                        return stringify.wrap(
                            data.selector,
                            data.props || data.rules
                        );
                    }
                });
        });
};

module.exports = cssrules;

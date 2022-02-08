'use strict';

const js0 = require('../.');

let f = function(p = {}) {
    js0.args(arguments, js0.Preset({
        test: [ 'string', js0.Default('Test') ],
    }));

    console.log(p);
}

f();
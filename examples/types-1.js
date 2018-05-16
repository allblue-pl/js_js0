'use strict';

const js0 = require('../.');


// /* Basic Types */
// console.log('\r\nBasic Types (true):\r\n');

// console.log(js0.type(undefined, 'undefined')); // true
// //
// console.log(js0.type(true, 'boolean')); // true
// console.log(js0.type(123, 'number')); // true
// console.log(js0.type('This is string', 'string')); // true
// console.log(js0.type(Symbol('test'), 'symbol')); // true
// console.log(js0.type({}, 'object')); // true
// console.log(js0.type(null, 'object')); // true

// /* All types are nullable by default. */
// console.log('\r\nNullables:\r\n');

// console.log(js0.type(null, 'boolean')); // false
// console.log(js0.type(null, [ 'number', js0.Null ])); // true
// console.log(js0.type(null, [ 'object' ])); // true
// console.log(js0.type(null, [ 'object', js0.NotNull ])); // false

// /* Either type is represented by array. */
// console.log('\r\nCombined:\r\n');

// console.log(js0.type(false, [ 'boolean', 'string' ])); // true
// console.log(js0.type('Hello there.', [ 'boolean', 'string' ])); // true

/* Presets */
let pre1 = {
    v1: 'Test',
    // v3: 'Spock',
    // v4: 'Panel',
};

js0.typeE(pre1, js0.Preset({
    v1: 'string',
    v2: [ js0.Default('Magda'), 'string' ],
    v3: [ js0.Default, 'string' ],
}));

console.log(pre1);

let pre2 = [
    {
        v1: 'Test',
        // v3: 'Spock',
        v2: 'Nie Magda',
        // v4: 'Panel',
    }, {
        v1: 'Test',
        v3: 'Spock',
        // v4: 'Panel',
    }
];

js0.typeE(pre2, js0.PresetArray({
    v1: 'string',
    v2: [ js0.Default('Magda'), 'string' ],
    v3: [ js0.Default, 'string' ],
}));

console.log(pre2);
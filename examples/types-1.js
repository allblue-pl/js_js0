'use strict';

const js0 = require('../.');


/* Basic Types */
console.log('\r\nBasic Types (true):\r\n');

console.log(js0.type(undefined, 'undefined')); // true
//
console.log(js0.type(true, 'boolean')); // true
console.log(js0.type(123, 'number')); // true
console.log(js0.type('This is string', 'string')); // true
console.log(js0.type(Symbol('test'), 'symbol')); // true
console.log(js0.type({}, 'object')); // true
console.log(js0.type(null, 'object')); // true

/* All types are nullable by default. */
console.log('\r\nNullables:\r\n');

console.log(js0.type(null, 'boolean')); // false
console.log(js0.type(null, [ 'number', js0.Null ])); // true
console.log(js0.type(null, [ 'object' ])); // true
console.log(js0.type(null, [ 'object', js0.NotNull ])); // false

/* Either type is represented by array. */
console.log('\r\nCombined:\r\n');

console.log(js0.type(false, [ 'boolean', 'string' ])); // true
console.log(js0.type('Hello there.', [ 'boolean', 'string' ])); // true

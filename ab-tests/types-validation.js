'use strict';

const abTests = require('ab-tests');
const js0 = require('../.');


module.exports = [

abTests.unit('Basic Types', (t) => {
    t.eq('undefined, true', () => js0.var('undefined', undefined) );
    //
    t.eq('boolean, true', () => js0.var('boolean', true) );
    t.eq('number, true', () => js0.var('number', 123) );
    t.eq('string, true', () => js0.var('string', 'This is string') );
    t.eq('symbol, true', () => js0.var('symbol', Symbol('test')) );
    t.eq('object, true', () => js0.var('object', {}) );

    t.eq('undefined, null', () => js0.var(null, 'boolean') === true );
}),

abTests.unit('Special Types', (t) => {
    let f1 = function(v1 = 'String') {
        t.eq('Default', () => {
            return js0.argsC(arguments, [ 'string', js0.Default, ]) === true
        });
    };
    f1();
}),

];

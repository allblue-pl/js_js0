'use strict';

const
    js0 = require('.'),
    js0Class = require('./js-lib/js0Class')
;

class A extends js0Class {
    constructor() { return js0.fn(arguments,
    '', (self) => {
        self.def('string');
        self.b = 5;
    })}

    f(arg1) { return js0.fn(arguments,
    'int',
    '', (self) => {
        
    })}
}

let a = new A();

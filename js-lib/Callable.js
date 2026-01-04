'use strict';

const
    js0 = require('./index.js')
;

class Callable {
    constructor(...args) { return js0.fn(arguments,
    js0.ExtraArgs,
    '', () => {
        this._fn = null;
        this._argTypes = null;
        this._rtnType = null;
        
        this._rtnType = args.length > 0 ? args[args.length - 1] : 'undefined';
        if (this._rtnType === '' || this._rtnType === 'void')
            this._rtnType = 'undefined';

        this._argTypes = [];
        for (let i = 0; i < args.length - 1; i++)
            this._argTypes.push(args[i]);
    })}

    call(...args) { return js0.fn(arguments,
    js0.ExtraArgs,
    null, () => {
        let callArgs = [ args ];
        for (let i = 0; i < this._argTypes.length; i++) 
            callArgs.push(this._argTypes[i]);
        js0.args.apply(js0, callArgs);

        return js0.rtn(this._rtnType, this._fn.apply(null, args));
    })}

    set(fn) { return js0.fn(arguments,
    'function',
    Callable, () => {
        this._fn = fn;  
        return this;
    })}
}
module.exports = Callable;
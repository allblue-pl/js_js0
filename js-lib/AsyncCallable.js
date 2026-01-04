'use strict';

import js0 from "./index.js";

export default class AsyncCallable {
    constructor(...args) { return js0.fn(arguments,
        
    '', () => {
        throw new Error('Not implemented yet.');
        // base it on Callable

        this._fn = null;
        this._argTypes = null;
        this._rtnType = null;
        
        this._rtnType = args.length > 0 ? args[args.length - 1] : 'undefined';
        if (rtnType === '' || rtnType === 'void')
            this._rtnType = 'undefined';

        if (args.length > 1) {
            this._argTypes = [ args[0] ];
            for (let i = 1; i < args.length - 1; i++)
                fnArgs.push(args[i]);

            js0.args.apply(this, fnArgs);
        }
        
        return js0.rtn(rtnType, rtnFn());
    })}

    call(...args) { return js0.fn(arguments,
    null, () => {
        let callArgs = [ args ];
        for (let i = 0; i < this._argTypes.length; i++) 
            callArgs.push(this._argTypes[i]);
        js0.args.apply(this, callArgs);

        return js0.rtn(this._rtnType, this._fn.apply(null, args));
    })}

    set(fn) { return js0.fn(arguments,
    'function',
    '', () => {
        this._fn = fn;  
    })}
}
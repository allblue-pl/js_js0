'use strict';

const js0 = require('.');

class js0_Array {
    get length() {
        return this._array.length;
    }

    constructor(itemType = null) {
    js0.args(arguments, [ js0.ArgType, js0.Default ]);
        Object.defineProperties(this, {
            itemType: { value: itemType },
            _array: { value: [] }
        });
    }

    get(index) {
    js0.args(arguments, 'int');
    js0.rtn(this.itemType, () => {
        return this._array[index];
    })}

    pop() {
    js0.args(arguments);
    js0.rtn(this.itemType, () => {
        return this._array.pop();
    })}

    push(item) {
    js0.args(arguments, this.itemType);

        this._array.push(item);
    }
}
module.exports = js0_Array;
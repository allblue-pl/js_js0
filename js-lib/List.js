'use strict';

const js0 = require('./index');


class List
{

    get size() {
        return this._values.length;
    }

    constructor(iterable = null)
    {
        js0.argsE(arguments, [ js0.Iterable, js0.Default ]);

        Object.defineProperties(this, {
            _keys: { value: [], },
            _values: { value: [], },
        });

        if (iterable !== null) {
            for (let item of iterable) {
                if (item instanceof Array) {
                    if (item.length === 2) {
                        this.set(item[0], item[1]);
                        continue;
                    }
                }

                this.add(item);
            }
        }
    }

    [Symbol.iterator]()
    {
        return new List.Iterator(this);
    }

    add(value)
    {
        let index = 0;
        while(this._keys.includes(index))
            index++;

        this.set(index, value);
    }

    addAt(index, value)
    {

    }

    delete(key)
    {
        let index = this._getIndexE(key);
        this.deleteAt(index);
    }

    deleteAt(index)
    {
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
    }

    get(key)
    {
        let index = this._getIndexE(key);

        return this._values[index];
    }

    getAt(index)
    {
        if (index < 0 || index >= this._values.length)
            throw new Error(`Index \`${index}\` does not exist in \`List\`.`);

        return this._values[index];
    }

    has(key)
    {
        return this._keys.includes(key);
    }

    indexOf(value)
    {
        return this._values.indexOf(value);
    }

    push(value)
    {
        let index = 0;
    }

    set(key, value)
    {
        let index = this._keys.indexOf(key);
        this.setAt(index, key, value);
    }

    setAt(index, key, value)
    {
        if (index === -1) {
            this._keys.push(key);
            this._values.push(value);
        } else
            this._values[index] = value;
    }


    _getIndexE(key)
    {
        let index = this._keys.indexOf(key);
        if (index === -1)
            throw new Error(`Key \`${key}\` does not exist in \`List\`.`);

        return index;
    }

}
module.exports = List;


Object.defineProperties(List, {

    Iterator: { value:
    class List_Iterator
    {

        constructor(list)
        {
            this._list = list;
            this._iterator = list._keys[Symbol.iterator]();
        }

        next()
        {
            let key_item = this._iterator.next();

            if (key_item.done)
                return { value: undefined, done: true, };

            return {
                value: [ key_item.value, this._list.get(key_item.value), ],
                done: false,
            };
        }

    }},

});

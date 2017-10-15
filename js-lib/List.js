'use strict';


class List
{

    get size() {
        return this._values.length;
    }

    constructor()
    {
        Object.defineProperties(this, {
            _keys: { value: [], },
            _values: { value: [], },
        });
    }

    [Symbol.iterator]()
    {
        return new List.Iterator(this);
    }

    delete(key)
    {
        let index = this._getIndexE(key);

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

    set(key, value)
    {
        let index = this._keys.indexOf(key);
        if (index === -1) {
            this._keys.push(key)
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
            }
        }

    }},

});

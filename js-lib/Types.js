'use strict';


class Types
{

    AssertArg(var_name, var_value, type)
    {
        if (typeof object === 'object') {
            if (typeof object === null)
                return;

            if ('node' in object) {
                if (object.node instanceof Node)
                    return;
            }
        }

        throw new TypeError('`node` property not found in object.');
    }

    AssertObject(object, property_name, class_type)
    {
        if (typeof object === 'object') {
            if (typeof object === null)
                return;

            if ('node' in object) {
                if (object.node instanceof Node)
                    return;
            }
        }

        throw new TypeError('`node` property not found in object.');
    }

}

module.exports = Types;

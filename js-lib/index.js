'use strict';


class abTypes_Class
{

    get Presets() {
        return require('./Presets');
    }


    constructor()
    {

    }

    args(args, ...types)
    {
        for (let i = 0; i < types.length; i++) {
            if (!this.var(args[i], types[i]))
                return false;
        }

        return true;
    }

    argsE(args, ...types)
    {
        for (let i = 0; i < types.length; i++)
            this.varE(args[i], types[i]);
    }

    assert(value, message = '')
    {
        if (!value)
            throw new this.AssertionError(message);
    }

    implements(object, prop_class)
    {
        this.args(arguments, 'object', 'function');

        if (!('Property' in prop_class))
            throw new Error(`\`${prop_class}\` is not a \`Property\`.`);

        if (prop_class.Property in object) {
            if (object[prop_class.Property] instanceof prop_class)
                return true;
        }

        return false;
    }

    implementsE(object, prop_class)
    {
        if (!this.implements(object, prop_class)) {
            throw new TypeError(`Object of type \`${object.constructor.name}\`` +
                    ` doesn't implement property \`${prop_class.name}\`.`);
        }
    }

    prop(main_object, prop_class)
    {
        this.args(arguments, 'object', 'function');

        if (!('Property' in prop_class))
            throw new Error(`\`${prop_class}\` is not a \`Property\`.`);

        let prop_args = [ null ];
        for (let i = 2; i < arguments.length; i++)
            prop_args.push(arguments[i]);

        let prop = new (Function.prototype.bind.apply(prop_class, prop_args))();
        Object.defineProperty(main_object, prop_class.Property, {
            value: prop
        });
    }

    var(value, value_type, errors = [])
    {
        if (value === null)
            return true;

        /* Special types. */
        if (value_type === this.Default) {
            if (value === undefined)
                return true;
        } else if (value_type === this.RawObject) {
            if (Object.getPrototypeOf(value) !== Object.prototype)
                return false;

            return true;
        }
        /* Special tyles. */

        let typeof_value_type = typeof value_type;

        /* Basic types. */
        if (typeof_value_type === 'string') {
            if (typeof value !== value_type) {
                let real_value_type = typeof value;

                errors.push(`Variable \`${value}\` of type \`${real_value_type}\` should be` +
                        ` of type \`${value_type}\`.`);
                return false;
            }

            return true;
        }

        if (typeof_value_type === 'object') {
            /* Multiple Types */
            if (value_type instanceof Array) {
                for (let i = 0; i < value_type.length; i++) {
                    if (this.var(value, value_type[i], errors))
                        return true;
                }

                return false;
            }

            return true;
        }

        if (typeof_value_type === 'function') {
            // /* Property */
            // if ('Property' in value_type) {
            //     if (!this.implements(value, value_type)) {
            //
            //         errors.push(`Variable does not implement property
            //                 \`${value_type.constructor}\`.`);
            //         return false;
            //     }
            //
            //     return true;
            // }

            /* Class */
            if (!(value instanceof value_type)) {
                errors.push(`Variable \`${value}\` is not  an instance of` +
                        ` \`${value_type.name}\`.`);
                return false;
            }

            return true;
        }

        throw new Error(`Unknown \`value_type\`: ${typeof_value_type}`);
    }

    varE(value, value_type)
    {
        let errors = [];
        if (this.var(value, value_type, errors))
            return;

        console.error('Error:', errors);
        throw new this.TypeError('Wrong variable type.');
    }

    virtual(object = null)
    {
        if (object === null)
            throw new this.NotImplementedError();

        throw new this.NotImplementedError(`Method not implemented in:` +
                ` \`${object.constructor.name}\`.`);
    }

}
module.exports = new abTypes_Class();


Object.defineProperties(abTypes_Class.prototype, {

    AssertionError: { value:
    class abTypes_AssertionError extends Error
    {
        constructor(...args)
        {
            super(...args);
        }

    }},


    BasicTypes: { value:
    new Set([
        'undefined',
        // 'object', /* null */
        'boolean',
        'number',
        'string',
        'symbol',
        'function',
        'object'
    ])},


    Default: { value:
    Symbol('abTypes_Default') },


    NotImplementedError: { value:
    class abTypes_NotImplementedError extends Error
    {

        constructor(...args)
        {
            super(...args);
        }

    }},


    RawObject: { value:
    Symbol('abTypes_RawObject') },


    TypeError: { value:
    class abTypes_TypeError extends Error
    {

        constructor(...args)
        {
            super(...args);

            // let stack = this.stack;
            // let stack_array = stack.split('\n');
            // stack_array.splice(1, 3);
            // this.stack = stack_array.join('\n');
        }

    }},

});

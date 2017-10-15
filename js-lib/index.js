'use strict';


class abTypes_Class
{

    get List() {
        return require('./List');
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
        this.argsE(arguments, 'object', abTypes.PropClass);

        return this.var(object, this.Prop(prop_class));
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
        Object.defineProperty(prop, '__main', { value: main_object });
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
        } if (value_type === this.Iterable)
            return typeof value[Symbol.iterator] === 'function';
         else if (value_type === this.RawObject)
            return Object.getPrototypeOf(value) === Object.prototype;
        else if (value_type === this.PropClass) {
            if (typeof value !== 'function') {
                errors.push(`\`${value}\` is not a \`Property\`.`);
                return false;
            }

            if (!('Property' in value)) {
                errors.push(`\`${value}\` is not a \`Property\`.`);
                return false;
            }

            return true;
        } else if (value_type instanceof this.PropType) {
            let prop_class = value_type._propClass;
            if (!(prop_class.Property in value)) {
                errors.push(`\`${value}\` does not implement \`${prop_class}\`.`);
                return false;
            }

            if (!(value[prop_class.Property] instanceof prop_class)) {
                errors.push(`\`${value}\` does not implement \`${prop_class}\`.`);
                return false;
            }

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
const abTypes = abTypes_Class.prototype;

Object.defineProperties(abTypes_Class.prototype, {

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


    /* Errors */
    AssertionError: { value:
    class abTypes_AssertionError extends Error
    {
        constructor(...args)
        {
            super(...args);
        }

    }},

    NotImplementedError: { value:
    class abTypes_NotImplementedError extends Error
    {

        constructor(...args)
        {
            super(...args);
        }

    }},


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
    /* / Errors */


    /* Special Types */
    Default: { value: Symbol('abTypes_Default'), },
    Iterable: { value: Symbol('abTypes_Iterable'), },
    RawObject: { value: Symbol('abTypes_RawObject'), },
    Prop: { value: (property) => {
            return new abTypes.PropType(property); }
    },
    PropClass: { value: Symbol('abTypes_PropClass'), },
    /* / Special Types */


    PropType: { value:
    class abTypes_PropType
    {

        constructor(prop_class)
        {
            abTypes.argsE(arguments, abTypes.PropClass);

            Object.defineProperties(this, {
                _propClass: { value: prop_class, },
            });
        }

    }},

});


module.exports = new abTypes_Class();

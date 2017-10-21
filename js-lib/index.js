'use strict';


class js0_Class
{

    get List() {
        return require('./List');
    }


    constructor()
    {

    }

    args(args, ...types)
    {
        for (let i = 0; i < types.length; i++)
            this.typeE(args[i], types[i]);
    }

    argsC(args, ...types)
    {
        for (let i = 0; i < types.length; i++) {
            if (!this.type(args[i], types[i]))
                return false;
        }

        return true;
    }

    assert(value, message = '')
    {
        if (!value)
            throw new this.AssertionError(message);
    }

    prop(main_object, prop_class, prop_args = [])
    {
        this.argsE(arguments, 'object', 'function', [ Array, this.Default ]);

        if (!('Property' in prop_class)) {
            throw new Error(`\`${prop_class}\` is not a \`Property\` ` +
                    `(no \`Property\` in object prototype).`);
        }
        if (typeof prop_class.Property !== 'string') {
            throw new Error(`\`${prop_class}\` is not a \`Property\` ` +
                    `(\`Property\` is not a string).`);
        }

        prop_args.splice(0, 0, null);
        let prop = new (Function.prototype.bind.apply(prop_class, prop_args))();
        Object.defineProperty(main_object, prop_class.Property, {
            value: prop
        });
    }

    rtn(value_type)
    {
        return (value) => {
            this.typeE(value, value_type);
            return value;
        };
    }

    type(value, value_type, errors = [])
    {
        if (value_type === null)
            return true;

        /* Special Types */
        if (value_type === this.Default) {
            if (value === undefined)
                return true;
        } else if (value_type === this.Iterable) {
            errors.push(`\`${value}\` is not \`Iterable\`.`);

            if (typeof value !== 'object')
                return false;
            return typeof value[Symbol.iterator] === 'function';
        } else if (value_type === this.RawObject)
            return Object.getPrototypeOf(value) === Object.prototype;
        else if (value_type === this.NotNull) {
            if (value === null) {
                errors.push(`\`${value}\` cannot be \`null\`.`);
                return false;
            }

            return true;
        } else if (value_type === this.Null) {
            if (value === null)
                return true;
        } else if (value_type instanceof this.Prop_Type) {
            let prop_class = value_type._propClass;
            if (typeof value !== 'object') {
                errors.push(`\`${value}\` does not implement \`${prop_class}\` ` +
                        ` (not an object).`);
                return false;
            }

            if (!(prop_class.Property in value)) {
                errors.push(`\`${value}\` does not implement \`${prop_class}\` ` +
                        ` (property not in object).`);
                return false;
            }

            if (!(value[prop_class.Property] instanceof prop_class)) {
                errors.push(`\`${value}\` does not implement \`${prop_class}\`. ` +
                        ` (wrong property type).`);
                return false;
            }

            return true;
        } else if (value_type === this.PropClass) {
            if (typeof value !== 'function') {
                errors.push(`\`${value}\` is not a \`Property\`.`);
                return false;
            }

            if (!('Property' in value)) {
                errors.push(`\`${value}\` is not a \`Property\`.`);
                return false;
            }

            return true;
        }
        /* / Special Types */

        let typeof_value_type = typeof value_type;

        /* Basic Types */
        if (typeof_value_type === 'string') {
            let result = true;
            if (this.Types_Basic.has(value_type)) {
                result = typeof value === value_type;
            } else if (this.Types_Extended.has(value_type)) {
                switch(value_type) {
                    case 'bool':
                        result = typeof_value_type === 'boolean';
                    case 'int':
                        result = Number.isInteger(value);
                        break;
                    case 'finite':
                        result = Number.isFinite(value);
                        break;
                    case 'nan':
                        result = Number.isNaN(value);
                        break;
                }
            } else {
                errors.push(`Unknown \type \`${value_type}\`.`);
                return false;
            }

            if (!result) {
                errors.push(`Variable \`${value}\` of type \`${typeof_value_type}\`` +
                    ` should be of type \`${value_type}\`.`);
                return false;
            }

            return true;
        }

        if (typeof_value_type === 'object') {
            /* Multiple Types */
            if (value_type instanceof Array) {
                if (value === null) {
                    for (let i = 0; i < value_type.length; i++) {
                        if (value_type[i] === this.NotNull) {
                            errors.push(`\`${value}\` cannot be \`null\`.`);
                            return false;
                        }
                    }
                }

                for (let i = 0; i < value_type.length; i++) {
                    if (this.type(value, value_type[i], errors))
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

    typeE(value, value_type)
    {
        let errors = [];
        if (this.type(value, value_type, errors))
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
const js0 = js0_Class.prototype;

Object.defineProperties(js0_Class.prototype, {

    /* Errors */
    AssertionError: { value:
    class js0_AssertionError extends Error
    {
        constructor(...args)
        {
            super(...args);
        }

    }},

    NotImplementedError: { value:
    class js0_NotImplementedError extends Error
    {

        constructor(...args)
        {
            super(...args);
        }

    }},


    TypeError: { value:
    class js0_TypeError extends Error
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

    /* Types */
    Types_Basic: { value:
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

    Types_Extended: { value:
    new Set([
        'bool',
        'finite',
        'int',
        'nan'
    ])},

    /* Types Special */
    Default: { value: Symbol('js0_Default'), },
    Iterable: { value: Symbol('js0_Iterable'), },
    NotNull: { value: Symbol('js0_NotNull'), },
    Null: { value: Symbol('js0_Null'), },
    Prop: { value: (property) => {
        return new js0.Prop_Type(property); }
    },
    PropClass: { value: Symbol('js0_PropClass'), },
    RawObject: { value: Symbol('js0_RawObject'), },

    And_Type: { value:
    class js0_And_Type
    {
        constructor(value_types)
        {
            js0.argsE(arguments, js0.PropClass);

            Object.defineProperties(this, {
                _valueTypes: { value: value_types, },
            });
        }
    }},

    // Or_Type: { value:
    // class js0_Or_Type
    // {
    //     constructor(prop_class)
    //     {
    //         js0.argsE(arguments, js0.PropClass);
    //
    //         Object.defineProperties(this, {
    //             _propClass: { value: prop_class, },
    //         });
    //     }
    // }},

    Prop_Type: { value:
    class js0_Prop_Type
    {

        constructor(prop_class)
        {
            js0.argsE(arguments, js0.PropClass);

            Object.defineProperties(this, {
                _propClass: { value: prop_class, },
            });
        }

    }},
    /* / Types */

});


module.exports = new js0_Class();

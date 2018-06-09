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
        for (let i = 0; i < types.length; i++) {
            let errors = [];
            if (!this.type(args[i], types[i], errors)) {
                console.error(`Error: Argument ${i} -> `, errors);
                throw new this.TypeError('Wrong argument type.');
            }
        }
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

    // implement(mainObject, propClass, ...propArgs)
    // {
    //     this.prop(mainObject, propClass, ...propArgs);
    // }

    // implements(object, propClass)
    // {
    //     return this.type(object, this.Prop(propClass));
    // }

    prop(mainObject, propClass, ...propArgs)
    {
        this.args(arguments, 'object', 'function');

        if (!('Property' in propClass)) {
            throw new Error(`\`${propClass}\` is not a \`Property\` ` +
                    `(no \`Property\` in object prototype).`);
        }
        if (typeof propClass.Property !== 'string') {
            throw new Error(`\`${propClass}\` is not a \`Property\` ` +
                    `(\`Property\` is not a string).`);
        }

        propArgs.splice(0, 0, null);
        let prop = new (Function.prototype.bind.apply(propClass, propArgs))();
        Object.defineProperty(mainObject, propClass.Property, {
            value: prop
        });
    }

    rtn(valueType)
    {
        return (value) => {
            this.typeE(value, valueType);
            return value;
        };
    }

    type(value, valueType, errors = [])
    {
        if (valueType === null)
            return true;

        let typeofValue = typeof value;

        /* Special Types */
        if (valueType === this.Default) {
            if (value === undefined)
                return true;

            return false;
        } else if (valueType === this.Default_Type) {
            if (value === undefined)
                return true;

            return false;
        } else if (valueType === this.Iterable) {
            if (value === null || typeof value !== 'object') {
                errors.push(`\`${value}\` is not \`Iterable\`.`);
                return false;
            }

            if (typeof value[Symbol.iterator] !== 'function') {
                errors.push(`\`${value}\` is not \`Iterable\`.`);
                return false;
            }

            return true;
        } else if (valueType === this.RawObject) {
            if (value === null)
                return true;

            // if (!(typeof value !== 'object')) {
            //     console.log(typeof value);
            //     errors.push(`'${value}' is not an RawObject.`);
            //     return false;
            // }

            if (Object.getPrototypeOf(value) !== Object.prototype) {
                errors.push(`'${value}' is not an RawObject.`);
                return false;
            }

            return true;
        } else if (valueType === this.NotNull) {
            if (value === null) {
                errors.push(`\`${value}\` cannot be \`null\`.`);
                return false;
            }

            return true;
        } else if (valueType === this.Null) {
            if (value === null)
                return true;

            return false;
        } else if (valueType instanceof this.Preset_Type) {
            if (typeofValue !== 'object') {
                errors.push(`Preset must be an object. Found: ${typeofValue}.`);
                return false;
            }

            let valid = true;
            
            for (let key in value) {
                if (!(key in valueType.presets)) {
                    errors.push(`Unknown key \`${key}\`.`);
                    valid = false;
                }
            }

            for (let key in valueType.presets) {
                let newErrors = [];
                
                if (typeof value[key] === 'undefined') {
                    if (valueType.presets[key] instanceof Array) {
                        for (let propValueType of valueType.presets[key]) {
                            if (propValueType instanceof this.Default_Type)
                                value[key] = propValueType.defaultValue;
                        }
                    }
                } 

                if (this.type(value[key], valueType.presets[key], newErrors))
                    continue;

                for (let newError of newErrors)
                    errors.push(`${key} -> ${newError}`);

                valid = false;
            }

            return valid;
        } else if (valueType instanceof this.PresetArray_Type) {
            if (!this.type(value, this.Iterable)) {
                errors.push('Preset array must be iterable.');
                return false;
            }

            let valid = true;

            let isArray = value instanceof Array;
            let itemKey = -1;
            for (let itemValue of value) {
                itemKey = isArray ? itemKey + 1 : itemValue[0];
                if (!isArray)
                    itemValue = itemValue[1];

                let newErrors = [];
                if (!this.type(itemValue, this.Preset(valueType.presets), newErrors)) {
                    for (let newError of newErrors)
                        errors.push(`[${itemKey}]: ${newError}`);
                    valid = false;
                }
            }

            return valid;
        } else if (valueType instanceof this.Prop_Type) {
            let propClass = valueType._propClass;
            if (typeof value !== 'object') {
                errors.push(`\`${value}\` does not implement \`${propClass}\` ` +
                        ` (not an object).`);
                return false;
            }

            if (!(propClass.Property in value)) {
                errors.push(`\`${value}\` does not implement \`${propClass}\` ` +
                        ` (property not in object).`);
                return false;
            }

            if (!(value[propClass.Property] instanceof propClass)) {
                errors.push(`\`${value}\` does not implement \`${propClass}\`. ` +
                        ` (wrong property type).`);
                return false;
            }

            return true;
        } else if (valueType === this.PropClass) {
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

        let typeofValueType = typeof valueType;

        /* Basic Types */
        if (typeofValueType === 'string') {
            let result = true;
            if (this.Types_Basic.has(valueType)) {
                result = typeof value === valueType;
            } else if (this.Types_Extended.has(valueType)) {
                switch(valueType) {
                    case 'bool':
                        result = typeofValueType === 'boolean';
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
                errors.push(`Unknown \type \`${valueType}\`.`);
                return false;
            }

            if (!result) {
                let typeof_value = typeof value;
                errors.push(`Variable \`${value}\` of type \`${typeof_value}\`` +
                    ` should be of type \`${valueType}\`.`);
                return false;
            }

            return true;
        }

        if (typeofValueType === 'object') {
            /* Multiple Types */
            if (valueType instanceof Array) {
                if (value === null) {
                    for (let i = 0; i < valueType.length; i++) {
                        if (valueType[i] === this.NotNull) {
                            errors.push(`\`${value}\` cannot be \`null\`.`);
                            return false;
                        }
                    }
                }

                for (let i = 0; i < valueType.length; i++) {
                    if (this.type(value, valueType[i], errors))
                        return true;
                }

                return false;
            }

            return true;
        }

        if (typeofValueType === 'function') {
            // /* Property */
            // if ('Property' in valueType) {
            //     if (!this.implements(value, valueType)) {
            //
            //         errors.push(`Variable does not implement property
            //                 \`${valueType.constructor}\`.`);
            //         return false;
            //     }
            //
            //     return true;
            // }

            /* Class */
            if (!(value instanceof valueType)) {
                errors.push(`Variable \`${value}\` is not  an instance of` +
                        ` \`${valueType.name}\`.`);
                return false;
            }

            return true;
        }

        throw new Error(`Unknown \`valueType\`: ${typeofValueType}`);
    }

    typeE(value, valueType)
    {
        let errors = [];
        if (this.type(value, valueType, errors))
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
    Array: { value: (itemType) => {
        return new js0.Array_Type(itemType);
    }},
    Default: { value: (defaulValue) => {
        return new js0.Default_Type(defaulValue);
    }},
    Iterable: { value: Symbol('js0_Iterable'), },
    NotNull: { value: Symbol('js0_NotNull'), },
    Null: { value: Symbol('js0_Null'), },
    Preset: { value: (presets) => {
        return new js0.Preset_Type(presets);
    }},
    PresetArray: { value: presets => {
        return new js0.PresetArray_Type(presets);
    }},
    Prop: { value: (property) => {
        return new js0.Prop_Type(property);
    }},
    PropClass: { value: Symbol('js0_PropClass'), },
    RawObject: { value: Symbol('js0_RawObject'), },

    And_Type: { value:
    class js0_And_Type 
    {
        constructor(valueTypes)
        {
            js0.args(arguments, js0.PropClass);

            Object.defineProperties(this, {
                _valueTypes: { value: valueTypes, },
            });
        }

    }},

    Default_Type: { value:
    class js0_Default_Type {

        constructor(defaultValue = undefined)
        {
            this.defaultValue = defaultValue;
        }

    }},

    // Or_Type: { value:
    // class js0_Or_Type
    // {
    //     constructor(propClass)
    //     {
    //         js0.argsE(arguments, js0.PropClass);
    //
    //         Object.defineProperties(this, {
    //             _propClass: { value: propClass, },
    //         });
    //     }
    // }},

    Preset_Type: { value:
    class js0_Preset_Type {
        
        constructor(presets)
        {
            js0.args(arguments, [ 'object' ]);

            this.presets = presets;
        }

    }},

    PresetArray_Type: { value:
    class js0_PresetArray_Type {
        
        constructor(presets)
        {
            js0.args(arguments, 'object');

            this.presets = presets;
        }

    }},

    Prop_Type: { value:
    class js0_Prop_Type {

        constructor(propClass)
        {
            js0.args(arguments, js0.PropClass);

            Object.defineProperties(this, {
                _propClass: { value: propClass, },
            });
        }

    }},
    /* / Types */

});


module.exports = new js0_Class();

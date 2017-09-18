'use strict';

let abTypes = require('./index');


class Info
{

    construct(class_object)
    {
        this._object = class_object;

        this._abstractClassInterfaces = [];

        this._implemented = [];
    }

    abstract(class_object, interface_class)
    {
        abTypes.args(arguments, 'object', abTypes.Interface);

        this._abstractClassInterfaces.push(interface_class);
    }

    implements(class_objects)
    {

    }

}
module.exports = Info;

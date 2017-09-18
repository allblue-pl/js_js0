'use strict';


class Interface
{

    

    // constructor(interface_class)
    // {
    //     this._methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(
    //             new interface_class()));
    //     this._methodNames.splice(0, 1);
    // }
    //
    // validate(object, not_implemented_methods = [])
    // {
    //     let valid = true;
    //
    //     for (let i = 0; i < this._methodNames.length; i++) {
    //         if (!(this._methodNames[i] in object)) {
    //             valid = false;
    //             not_implemented_methods.push(this._methodNames[i]);
    //         }
    //     }
    //
    //     return valid;
    // }

}

module.exports = Interface;

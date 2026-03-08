
class js0Class {
    constructor() {
        this._proxyHandler = {
            get(target, prop, receiver) {
                console.log('prop get', prop);
                if (!(prop in target))
                    throw new Error(`Property '${prop}' does not exist in object of class '${target.constructor.name}'.`)

                return target[prop];
            },

            set(target, prop, value) {
                console.log('prop set', prop);
                if (!(prop in target))
                    throw new Error(`Property '${prop}' does not exist in object of class '${target.constructor.name}'.`)

                return target[prop];
            }
        }
    }
}
module.exports = js0Class;
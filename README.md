# js0

**js0** is a lightweight, support package that adds some useful functionalities to javascript language without forcing particular convention and without a need of transpiling.

Basic functionalities:
 - types validation (arguments, returns, variables, etc.)
 - extending objects by properties
 - advanced object type arguments
 - abstract methods
 - `List` class (iterable **and indexable**)


## Types Validation

### Validation Methods

 - `js0.type(value, value_type, [ errors ])`
   - Returns `true` / `false` whether `value` meets `value_type` conditions.
 - `js0.varE(value, value_type)`
   - Throws an `Error` when `value` does not meet `value_type` conditions.
 - `js0.argsC(args, ...value_types)`
   - Returns `true` / `false` whether each argument meets corresponding `value_type`.
 - `js0.argsE(args, ...value_types)`
   - Throws an `Error` when at least one arguments does not meet corresponding `value_type` condition.

Variables and arguments can be evaluated based on basic types, special types or combinations.

### Basic Types

Basic types are equivalents of `v1 typeof === '[BasicType]'`.

 - `undefined`
 - `boolean`
 - `number`
 - `string`
 - `symbol`
 - `object`

Examples:
```js
/* Basic Types */
js0.type(undefined, 'undefined'); // true
//
js0.type(true, 'boolean'); // true
js0.type(123, 'number'); // true
js0.type('This is string', 'string'); // true
js0.type(Symbol('test'), 'symbol'); // true
js0.type({}, 'object'); // true

/* All types are nullable by default. */
js0.type(null, 'boolean'); // true
js0.type(null, 'number'); // true

/* Either type is represented by array. */
js0.type(false, [ 'boolean', 'string' ]); // true
js0.type('Hello there.', [ 'boolean', 'string' ]); // true
```


## List

Example:

```js
let l = new js0.List(new Map([
    [ 'Miki', 'mouse', ],
]);

l.set('Spocky', 'dog');
l.add('cat');

for (let [ k, v ] of l) {
    console.log(k, v);
}
```



## Properties

Property is an object extension achieved by adding another object as property with a particular name.

Example:

```js
'use strict';

const js0 = require('.');


class PAnimal
{ static get Property() { return 'pAnimal'; }

    constructor() {
        this.name = 'Not named yet';
    }

}

class PDog
{ static get Property() { return 'pDog'; }

    constructor(main, breed) {
        js0.argsE(arguments, js0.Prop(PAnimal), [ 'string', js0.NotNull ]);

        this.main = main;
        this.breed = breed;
    }

}

class PCat
{ static get Property() { return 'pCat'; }

    constructor(main, fur_color) {
        js0.argsE(arguments, js0.Prop(PAnimal), [ 'string', js0.NotNull ]);

        this.main = main;
        this.furColor = fur_color;
    }

}

/* Doggy */
class Spock
{

    constructor() {
        js0.prop(this, PAnimal);
        js0.prop(this, PDog, [ this, 'westie' ]);

        this.pAnimal.name = 'Spock';
    }

}

/* Kitty */
class Puss
{

    constructor() {
        js0.prop(this, PAnimal);
        js0.prop(this, PCat, [ this, 'black as night' ]);
    }

}

let s = new Spock();
let p = new Puss();

console.log(`"${s.pAnimal.name}" breed is ${s.pDog.breed}`); // Spock is a westie
console.log(`"${p.pAnimal.name}" fur color is ${p.pCat.furColor}`); // Puss fur color is black as night
```

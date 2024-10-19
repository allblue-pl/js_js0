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

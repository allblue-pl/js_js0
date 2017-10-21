'use strict';

const js0 = require('../.');


let l = new js0.List(new Map([
    [ 'Miki', 'mouse', ],
]));

l.set('Spocky', 'dog');
l.add('cat');

for (let [ k, v ] of l) {
    console.log(k, v);
}

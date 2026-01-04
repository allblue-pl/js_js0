'use strict'; 'js0';

const js0 = require('../.');


let a = new js0.Array('number');

a.push(1);

js0.typeE(a, js0.TArray('number'))
js0.typeE(a, js0.TList('number'))
js0.typeE(a, js0.TRawObject)


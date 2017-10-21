'use strict';

const abTests = require('ab-tests');
const js0 = require('../.');


module.exports = [

abTests.unit('List', (t) => {
    let l = new js0.List();

    l.push('cat');
    l.set('Spocky', 'dog');


    t.eq('key `0`', () =>
        l.get(0) === 'cat'
    );
    t.eq('key `Spocky`', () =>
        l.get('Spocky') === 'dog'
    );
}),


];

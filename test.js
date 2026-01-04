'use strict';

const
    js0 = require('.')
;

let c1 = new js0.Callable('string', 'number')
        .set((t1) => {
    return 5;
    // return 5;
});

c1.call('Hello');
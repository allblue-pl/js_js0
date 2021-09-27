'use strict';

const
    js0 = require('.')
;

let t1 = {
    a: [{}],
};

js0.typeE(t1, js0.Preset({
    a: [ js0.ArrayItems(js0.Preset({
        
    })), js0.Default([]) ],
}));
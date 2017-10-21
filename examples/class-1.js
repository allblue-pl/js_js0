'use strict'; 'js0';

const js0 = require('../.');


class Class1
{

    f1(a, b, c = null)
    {
        js0.args(arguments, 'string', 'number', [ 'object', js0.Default ]);

        console.log(a, b === null);
        b++;

        return js0.rtn('number')(b);
    }

    f2(a, b)
    {
        js0.args(arguments, 'number', 'number');
        let rtn = js0.rtn('number');

        if (a > b)
            return rtn(a);
        else
            return rtn(b);
    }

}

let c = new Class1();

console.log(c.f1('Hello World', 10));
console.log(c.f2(5, 10));

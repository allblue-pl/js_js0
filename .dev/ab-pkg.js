'use strict';

const abPackage = require('ab-package');
const abPackage_AllBlue = require('ab-package_allblue');


abPackage.exec([
    {
        '_exts': [ 'npm', 'bower' ],
    },
    abPackage_AllBlue({
        npm: 'js0',
        bower: 'js0',

        gitUri: 'https://github.com/allblue-pl-dev/dev_node_ab-package',
        description: 'Lightweight, support package that adds some useful' +
                ' functionalities to javascript language without forcing' +
                ' particular convention and without a need of transpiling.',
        keywords: [ 'ab-package-test' ],
    }),
]);

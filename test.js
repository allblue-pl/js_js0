import js0 from "./index.js";

let a = "test";

let errors = [];
js0.type(a, [ js0.Null ], errors);

console.log(errors);


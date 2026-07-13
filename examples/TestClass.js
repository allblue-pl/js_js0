import js0 from "js0";

export default class TestClass {
    /**@type TestClass*/ get $() { return js0.Proxy(this); }

    constructor() { return js0.fn(arguments,
    '', () => {
        
    })}

    hop() { return js0.fn(arguments,
    '', ($) => {
        
    })}
}
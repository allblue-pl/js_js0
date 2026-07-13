import js0 from "..js";
import js0Class from "./js-lib/js0Class.js";

class A extends js0Class {
    #test;

    constructor() { 
        console.log(this.#test);
    }

    fn() {

    }
}

let a = new A();

A.sth();


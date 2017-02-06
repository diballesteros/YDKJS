/*
    Chapter 1: Types
                      */

/* A Type By Any Other Name... */

// Understand coercion

/* Built-in Types */

// JS has seven built-in types:
// null
// undefined
// boolean
// number
// string
// object
// symbol -- added in ES6!

// Note: all of these are called primitive except object

// typeof operator inspects the type of the given value

typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { life: 42 } === "object"; // true

// added in ES6!
typeof Symbol() === "symbol"; // true

// null is buggy

typeof null === "object"; // true

// to test it youd have to do a compound check

var a = null;
(!a && typeof a === "object"); // true

//subtypes of objects

typeof function a(){ /* .. */ } === "function"; // true

typeof [1,2,3] === "object"; // true

/* Values as Types */

// variables contain values not types

var a = 42;
typeof a; // "number"

a = true;
typeof a; // "boolean"

// typeof returns a string
typeof typeof 42; // "string"

// undefined vs "undeclared"

// undefined is not equivalent to undeclared var a; still  exists within the scope but doesnt have a value assigned to it

// Confusion:

var a;

a; // undefined
b; // ReferenceError: b is not defined

//However b is actually not declared while a is undefined but not undeclared
//typeof reinforces the confusion

var a;

typeof a; // "undefined"
typeof b; // "undefined"
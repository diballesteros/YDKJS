/*
    Chapter 3: Natives
                        */

// Commonly used natives:
// String()
// Number()
// Boolean()
// Array()
// Object()
// Function()
// RegExp()
// Date()
// Error()
// Symbol() -- added in ES6

var s = new String("Hello World!");

console.log( s.toString() ); // "Hello World!"

// However its an object wrapper around the primitivie string

var a = new String( "abc" );

typeof a; // "object" ... not "String"

a instanceof String; // true

Object.prototype.toString.call(a); // "[object String]"

/* Internal [[Class]] */

Object.prototype.toString.call( [1,2,3] ); // "[object Array]"

Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"

// For primitive values

Object.prototype.toString.call( "abc" ); // "[object String]"

/* Boxing Wrappers */

// Better to use the literal "abc" and 42 rather than new String("abc") and new Number(42) because of optimizations

// Object Wrapper Gotchas

var a = new Boolean( false );

if(!a){
    console.log("Oops"); // never runs
}

// Objects are 'Truthy'

/* Unboxing */

var a = new String("abc");

a.valueOf(); // "abc"

/* Natives as Constructors */

// Array(..)

var a = new Array( 1, 2, 3);
a; // [1, 2, 3]

var b = [1, 2, 3];
b; // [1, 2, 3]

// the new in the constructor can be unnecessary
// If only one input is pushed itll be the length confusingly
// Bottom line: never under any circumstance create and use empty-slot arrays

//Object(..), Function(..), and RegExp(..)
// generally optional and should be avoided

// Date(..) and Error(..)
// No literal form for either so they're more useful

if(!Date.now){
    Date.now = function(){
        return (new Date()).getTime();
    };
}


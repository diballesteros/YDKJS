/*
    Chapter 2: Values
                        */

/* Arrays */

// Container for values even other arrays even for other arrays, multidimensional arrays

var a = [1,"2", [3]];

a.length; // 3
a[0] === 1; // true
a[2][0] === 3; // true

// No need to presize the arrays

var a = [ ];

a.length; // 0

a[0] = 1;
a[1] = "2";
a[2] = [ 3 ];

a.length; // 3

// Array-Likes

// Converting array like values to a true array using slice(..)

function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar", "baz"); // ["bar", "baz", "bam"]

// ES6 has a utility that doest he same task

var arr = Array.from(arguments);

/* Strings */

// Consider:

var a = "foo";
var b = ["f", "o", "o"];

// Some resemblances

a.length; // 3
b.length // 3

a.indexOf("o"); // 1
b.indexOf("o"); // 1

var c = a.concat("bar"); // "foobar"
var d = b.concat(["b","a","r"]); // ["f","o","o","b","a","r"]

a === c; // false
b === d; // false

a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]

// strings are immutable and are modified then returned as a new string, while arrays are modified in place

c = a.toUpperCase();
a === c; // false
a; // "foo"
c; // "FOO"

b.push("!");
b; // ["f","O","o","!"]

// non-mutation array methods can be borrowed against strings

a.join; // undefined
a.map; // undefined

var c = Array.prototype.join.call( a, "-");
var d = Array.prototype.map.call( a, function(v){
    return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o"
d; // "F.O.O."

// It is possible to convert string to array however not with complex unicode characters unless the appropiate libraries are put in place

var c = a;
// split 'a' into an array of characters
.split("")
// reverse the array of characters
.reverse()
// join the array of characters back to a string
.join("");

c; // "oof"

/* Numbers */


// number includes both "integer" and fractional decimal numbers -- no true integer however

// Numeric Syntax

var a = 42;
var b = 42.3;

// Leading portion of a decimal value if 0 is optional

var a = 0.42;
var b = .42;

// trailing portion, if 0, also optional

var a = 42.0;
var b = 42.;

// Very large or small numbers will automatically be outputted to exponential form

var a = 5E10;
a;
a.toExponential(); // "5e+10"

var b = a * a;
b; // 2.5e+21

var c = 1/a;
c; // 2e-11

// Adjust decimal places

var a = 42.59;

a.toFixed(0); // "43"
a.toFixed(1); // "42.6"
a.toFixed(2); // "42.59"
a.toFixed(3); // "42.5900";

// toPrecision(..) is similar but specifices how many significant digits should be used to represent the value

var a = 42.59;

a.toPrecision(1); // "4e+1"
a.toPrecision(2); // "43"
a.toPrecision(3); // "42.6"
a.toPrecision(4); // "42.59"
a.toPrecision(5); // "42.590"

// Small Decimal Values

// To account for overflow and rounding error, epsilon is used

// ES6 Number.EPSILON is prebuilt but it can be polyfilled

if(!Number.EPSILON){
    Number.EPSILON = Math.pow(2,-52);
}

// Can be used to compare two numbers for equality

function numbersCloseEnoughToEqual(n1,n2){
    return Math.abs (n1 - n2) < Number.EPSILON;
}

var a = 0.1 = 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b); // true
numbersCloseEnoughToEqual(0.0000001, 0.0000002); // false

// Testing for Integers

Number.isInteger(42); // true
Number.isInteger(42.000); // true
Number.isInteger(42.3); // false

// to polyfill pre ES6

if(!Number.isInteger) {
    Number.isInteger = function(num){
        return typeof num = "number" && num % 1 == 0;
    };
}

/* Special Values */

// The Non-value Values

// null is an empty value, undefined is a missing value
// null is a special keyword, undefined is an identifier

// Undefined

// In non-strict mode its possible, but ill-advised, to assign a value to the globally provided undefined identifier

// 'void' Operator

function doSomething() {
    // note: 'APP.ready' is provided by our application
    if(!APP.ready){
        // try again later
        return void setTimeout(doSomething, 100);
    }
    
    var result;
    
    // do some other stuff
    return result;
}

//were we able to do it right away?
if(doSomething()) {
    // handle next tasks right away
}

// If you need undefined most common to use void operator

// Special Numbers

var a = 2 / "foo"; // NaN

typeof a === "number"; // true

// NaN (Not A Number) is a number

// NaN is not equal to itself, so how to compare?
// isNan(..) has a fatal flaw, strings can be it too

// ES6 has a Utility for comparison: Number.isNaN(..)

// Infinities

var a = 1/0; // Infinity
var b = -1/0; // -Infinity
//Causes by overflow onto either side

// Zeros

// Zeros can be negative to have the information of movement

var a = 0 / -3; // -0
var b = 0 * -3; // =0
//Does not apply to addition and subtraction

// Special Equality

// To test for absolute equality Object.is(..)

var a = 2 / "foo";
var b = -3 * 0;

Object.is(a, NaN); // true
Object.is(b, -0); // true

Object.is(b, 0); // false

// === and == are more efficient so Object.is(..) only to be used in these special cases

/* Value vs. Reference */

// Primitive scalar values become copies
// Compound values are references

var a = 2;
var b = a; // 'b' is always a copy of the value in 'a'
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // 'd' is a reference to the shared '[1,2,3]' value
d.push('4');
c; // [1,2,3,4]
d; // [1,2,3,4]
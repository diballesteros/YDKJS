/*
    Chapter 4: Coercion
                         */

/* Converting Values */

var a = 42;

var b = a + ""; // implicit coercion

var c = String(a); // explicit coercion

/* Abstract Value Operations */

// ToString

// Built-in primitive values get stringification i.e. null becomes "null"
// Very large or small numbers get expressed in exponential form

// Array Stringification
var a = [1,2,3];
a.toString(); // "1,2,3"

// JSON Stringification

// JSON.stringify(..) works the same way except for values that aren't JSON-safe
// undefined, functions, (ES6+) symbols, objects with circular reference

// ToNumber

// true becomes 1, false becomes 0, undefined becomes NaN and null becomes 0

// ToBoolean

// 1 is not equivalent to true and 0 is not equivalent to false in JS

// Falsy values
//undefined, null, false, +0, -0, NaN, ""
// Anything not explicitly on the falsy list is therefore truthy (implied by the specifications)

// Falsy Objects
var a = new Boolean(false);
var b = new Number(0);
var c = new String( "" );

var d = Boolean( a && b && c);

d; // true

// Truthy Values
var a = "false";
var b = "0";
var c = "''";

var d = Boolean(a && b && c);

d; // true

/* Explicit Coercion */

// Explicitly: String <--> Numbers
// Do not use the wored new, to not create object wrappers

var a = 42;
var b = String(a);

var c = "3.14";
var d = Number(c);

b; // "42"
d; // 3.14

//Other forms of explicit coercion
var a = 42;
var b = a.toString();

var c = "3.14";
var d = +c;

b; // "42"
d; // 3.14

// + is the unary operator but can be confusing

var c = "3.14";
var d = 5+ +c;

d; // 8.14

// unary for Date to Number
var d = new Date("Mon, 18 Aug 2014 08:53:06 CDT" );

+d; // 1408369986000

// Most common usage is to get the current 'now' moment
var timestamp = +new Date();

// However the most preferable one is an option ES5 added
var timestamp = Date.now();

//polyfill
if(!Date.now){
    Date.now = function() {
        return +new Date();
    };
}


// Explicitly: Parsing Numeric Strings

var a = "42";
var b = "42px";

Number( a ); // 42
parseInt(a); // 42

Number(b); // NaN
parseInt(b); // 42

// Parse when you don't care about right handed characters

// Explicitly: * --> Boolean

var a = "0";

Boolean(a); // true

!!a; // true

/* Implicit Coercion */

// Implicitly: Strings <--> Numbers

var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42

// If either is a string
var a = 42;
var b = a + "";

b; // "42";

// To implicitly coerce from string to number, substracion, a * 1, a/1

var a = "3.14";
var b = a - 0;

b; // 3.14

var a = [3];
var b = [1];

a - b; // 2

// Implicitly: Booleans --> Numbers

function onlyOne(a,b,c) {
    return !!((a && !b && !c) ||
        (!a && b && !c) || (!a && !b && c));
}

var a = true;
var b = false;

onlyOne(a,b,b); // true
onlyOne(b,a,b); // true

onlyOne(a,b,a); // false

// This is fine for a small size of values, but what about lots of comparisons?

function onlyOne() {
    var sum = 0;
    for (var i=0; i < arguments.length; i++) {
        // skip falsy values. same as treating
        // them as 0's, but avoids NaN's.
        if(arguments[i]){
            sum += arguments[i];
        }
    }
    return sum == 1;
}

var a = true;
var b = true;

onlyOne(b,a); // true
onlyOne(b,a,b,b,b); // true

onlyOne(b,b); // false
onlyOne(b,a,b,b,b,a); // false

// Implicitly: * --> Boolean

var a = 42;
var b = "abc";
var c;
var d = null;

if(a) {
    console.log("yep"); // yep
}

while(c){
    console.log("nope, never runs");
}

c = d ? a : b;
c; // "abc"

if ((a && d) || c){
    console.log("yep"); // yep
}

// Operators || and &&
// Operand Selector Operators, in other words one of the inputs
// is selected as the output afterwards

var a = 42;
var b = "abc";
var c = null;

a || b; // 42
a && b; // "abc"

c || b; // "abc"
c && b; // null

// For the || operator if the first is true then the first operand is selected
// For the && operator its the inverse, if the test is true then the second operand is selected

/* Loose Equals vs. Strict Equals */

// == allows coercion, === does not allow coercion
// Relatively same performance level

// Abstract Equality
var a = 42;
var b = "42";

a === b; // false
a == b; // true
// For '=='
// 1. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y)
// 2. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y

var x = true;
var y = "42";

x == y; // false
// Within the spec the boolean is coerced to a number value so the comparison would be:
// 1 == "42" then the algorithm is reconsulted which results in a false value

// Avoid using loose equalities with booleans

var a = "42";

// bad (will fail!)
if(a == true){}

// also bad(will fail!)
if(a === true){}

// good enough (works implicitly)
if(a){}

// better (works explicitly)
if(!!a){}

// also great(works explicitly)
if(Boolean(a)){}

// When null and undefined are compared '==' then
// the return value is true

// Bad cases of coercion:
"0" == false; // true
false == 0; // true
false = ""; // true
false == []; // true
"" == 0; // true
"" == []; // true
0 == []; // true
// Always avoid == false comparisons

"" == 0; // true
"" == []; // true
0 == []; // true

// Safely using implicit coercion:
// 1. If either side of the comparison can have true or false values, don't ever, EVER use ==
// 2. If either side of the comparison can have [], "", or 0 values consider not using ==
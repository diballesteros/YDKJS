/*
    Values & Types
                    */

var a;
typeof a;

a = "hello world";
typeof a;

a = 42;
typeof a;

a = true;
typeof a;

a = null;
typeof a;

a = undefined;
typeof a;

a = { b: "c"};
typeof a;

//Symbol is the 7th in ES6
//Null returns object -- Bug that won't get fixed

/*
    Objects
            */

var obj = {
    a: "hello world",
    b: 42,
    c: true
};

obj.a;  //"hello world"
obj.b;  //42
obj.c;  //true

obj["a"];
obj["b"];
obj["c"];

var obj2 = {
    a: "hello world",
    b: 42
}

var b = "a";

//Quotation marks are used to seperate from variables

obj[b];     //"hello world"
obj["b"];   // 42

/*
    Arrays
            */

var arr = [
    "hello world",
    42,
    true
];

arr[0]; //"hello world"
arr[1]; //42
arr[2]; //true
arr.length; //3

typeof arr; // "object"

/*
    Functions  
                */

function foo(){
    return 42;
}

foo.bar = "hello world";

typeof foo; //"function"
typeof foo();   //"number"
typeof foo.bar; //"string"

/*
    Built-In Type Methods
                            */

var a = "hello world";
var b = 3.14159;

a.length;   // 11
a.toUpperCase();    // "HELLO WORLD"
b.toFixed(4);   // "3.1416"

/*
    Comparing values
                        */

//Explicit and Implicit Coercion

var a = "42";
var b = Number(a);

a;  // "42"
b;  // 42 -- the number!

var c = a * 1;  //"42" implicitly coerced to 42 here

a;  // "42"
c;  // 42 -- the number!

/*
Falsy and truthy values
falsy: "" (empty string)
        0, -0, NaN (invalid number)
        null, undefined
        false
truthy: "hello"
        42
        true
        [], [1, "2", 3] (arrays)
        {}, { a: 42 } (objects)
        function foo() { .. } (functions)
*/

//Equalities
var a = "42";
var b = 42;

a == b;     // true
a === b;    //false

// If either side can be true or false use ===
//If either value can be (0, "", []) use ===
// All other cases its fine to use ==

var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c; //true
b == c; //true
a == b; //false

//Inequality
var a = 41;
var b = "42";
var c = "43";

a < b;  // true
b < c;  // true

//Number to string coerces to number
var a = 42;
var b = "foo";

a < b;  // false
a > b;  // false
a == b; // false

//All are false because "foo" is coerced into being an invalid number or NaN

/*
    Variables
                */


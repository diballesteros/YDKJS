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

var a = 2;

foo();  // works because 'foo()'
        // declaration is "hoisted"

function foo() {
    a = 3;
    
    console.log(a); // 3
    
    var a;  // declaration is "hoisted"
            // to the top of 'foo()'
}

console.log(a);     // 2

// Nested Scopes

function foo() {
    var a = 1;
    
    function bar() {
        var b = 2;
        
        function baz(){
            var c = 3;
            
            console.log( a, b, c);  // 1, 2, 3
        }
        
        baz();
        console.log(a,b);   // 1 2
    }
    
    bar();
    console.log(a); // 1
}

foo();

// if not formmally declared with "var" becomes global

function foo() {
    a = 1;  // 'a' not formally declared
}

foo();
a;      // 1 -- oops, not auto global variable

// "let" allows to declare variables to individual blocks

function foo() {
    var a = 1;
    
    if(a>=1){
        let b = 2;
        
        while (b<5){
            let c = b * 2;
            b++;
            
            console.log(a+c);
        }
    }
}

foo();  // 5 7 9

/*
    Conditionals
                    */

// If theres too many cases over the same test

if(a == 2){
    // do something
}
else if (a == 10){
    // do something
}
else if (a == 42){
    // do yet another thing
}
else {
    // fallback to here
}

//Structure works but its verbose, this is the better alternative

switch(a) {
    case 2:
        // do something
        break;
    case 10:
        // do another thing
        break;
    case 42:
        // do yet another thing
        break;
    default:
        // fallback to here
}

//if the break is omitted then it will continue to to do the statement

switch(a) {
    case 2: // if a is either 2 or 10 "some cool stuff" is executed
    case 10:
        // some cool stuff
        break;
    case 42:
        // other stuff
        break;
    default:
        // fallback
}

var a = 42;

var b = (a > 41) ? "hello" : "world";
//Most common in assignments, first is true second is false
// similar to:

// if (a > 41){
//      b = "hello";
// }
// else {
//  b = "world";
// }

/*
    Strict Mode
                */

//Tightens rules for certain behaviors, is good

function foo(){
    "use strict";
    
    // this code is strict mode
    
    function bar(){
        //this code is strict mode
    }
}

// this code is not strict mode

"use strict";

function foo() {
    // this code is strict mode
    
    function bar(){
        // this code is strict mode
    }
}

// this code is strict mode

// Improvement: strictmode disallows auto-global variable

/*
    Functions as Values
                        */

//Variables can be assigned functions with or without name

//Immediately Invoked Function Expressions (IIFES)

(function IIFE(){
    console.log("Hello!");
})();
// "Hello!"

// IIFE can create variable scope

var a = 42;

(function IIFE(){
    var a = 10;
    console.log(a); // 10
})();

console.log(a); // 42

// Can also have return values

var x = (function IIFE(){
    return 42;
})();

x;  // 42

// Closure

function makeAdder(x){
    // parameter 'x' is an inner variable
    
    // inner function 'add()' uses 'x' so
    // it has a "closure" over it
    function add(y){
        return y + x;
    };
    
    return add;
}

//to reference the inner add, give it a var

// 'plusOne' gets a reference to the inner 'add(..)'
// function with closure over the 'x' parameter of
// the outer 'makeAdder(..)'
var plusOne = makeAdder(1);

//'plusTen' gets a reference to the inner 'add(..)'
// function with closure over the 'x' parameter of
// the outer 'makeAdder(..)'
var plusTen = makeAdder(10);

plusOne(3);     // 4 <-- 1 + 3
plusOne(41);    // 42 <-- 1 + 41

plusTen(13);    // 23 <-- 10 + 13

// Modules

function User(){
    var username, password;
    
    function doLogin(user, pw){
        username = user;
        password = pw;
        
        // do the rest of the login work
    }
    
    var publicAPI = {
        login: doLogin
    };
    
    return publicAPI;
}

// creat a 'User' module instance

var fred = User();

fred.login("fred", "12Battery34!");

// Using new wastes resources

// "this" identifier

function foo(){
    console.log( this.bar);
}

var bar = "global";

var obj1 = {
    bar: "obj1",
    foo: foo
};

var obj2 = {
    bar: "obj2"
};

// ---------

foo();  // "global"
obj1.foo(); // "obj1"
foo.call(obj2); // "obj2"
new foo();  // undefined

//changes depending on how it was called

/*
    Prototypes
                */

var foo = {
    a: 42
};

// create 'bar' and link it to 'foo'
var bar = Object.create(foo);

bar.b = "hello world";

bar.b;  // "hello world"
bar.a;  // 42 <-- delegated to 'foo'

//bar gets a from foo cause of the prototype link
// abuses mechanism to somehow do "inheritance"

/*
    Old & New
                */

// Bringing new functionality to old browsers

// Polyfilling

//Making the new functionality in small snippets of code to make it available to browsers

//Transpiling

// Converting new syntax to old code

/*
    Non-JavaScript
                    */

// DOM
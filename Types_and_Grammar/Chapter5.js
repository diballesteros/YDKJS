/*
    Chapter 5: Grammar
                         */

/* Statements & Expressions */

// Statements are sentences, expressions are phrases, operators are conjunctions/punctuation

var a = 3 * 6;
var b = a;
b;

// Expressions with Side Effects

// Prefix/Suffix matter

var a = 42;

a++; // 42
a; // 43

++a; // 44
a; // 44

var a = 42, b;
b = (a++, a);

a; // 43
b; // 43

// Operator Precedence

var a = 42;
var b = "foo";

a && b; // "foo"
a || b; // 42

// && gets evaluated first then ||
// ? : is less precedent than both

// Associativity
// ? : is Right associative

true ? false  : true ? true : false; // false

true ? false : (true ? true : false); // false
(true ? false : true) ? true : false; // false

// Use operator precedence/associativity where it leads to shorter
// and cleaner code, but use () manual grouping in places
// where it helps create clarity and reduce confusion (? :)

/* Automatic Semicolons */

// Use semicolons as normal, wherever they're requiered, don't depend on the ASI

/* Errors */

// ES6 TDZ (Temporal dead zone) error, referencing before initialization

{
    a = 2; // ReferenceError!
    let a;
}
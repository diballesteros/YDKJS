/*
    Lexical Scope
                    */

// Stateful

// Goes upwards, scopes can be considered bubbles, bubbles containing other bubbles (e.g. nested scopes)

// Lexical scope defined only by where a function is declared

// Cheating lexical scope is bad > frowned upon > also leads to poorer performance

// eval (..) evaluates a string as code, this can cheat the lexical scope rules

function foo(str, a) {
    eval(str);
    console.log(a,b);
}

var b = 2;

foo("var b = 3;", 1);   // 1 3

// The string "var b = 3;" is evaluated cheating lexical scope rules and producing a different output

// when used with strict mode declarations are not allowed:

function foo(str) {
    "use strict";
    eval(str);
    console.log(a); // ReferenceError: a is not defined
}

foo("var a = 2");

// the "with" command creates a new lexical scope, also bad and inefficient

// The engine runs slower simply by the fact of having a "with" or "eval(..)" because it cannot make optimizations cause of the lexical scope problems
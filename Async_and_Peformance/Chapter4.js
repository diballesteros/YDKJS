/*
    Chapter 4: Generators
                            */


/* Breaking Run-to-Completion */

var x = 1;

function foo() {
    x++;
    bar();      // <-- what about this line?
    console.log("x:", x);
}

function bar(){
    x++;
}

foo();      // x:3

// Cooperative currency:

var x = 1;

function *foo() {
    x++;
    yield; // pause!
    console.log("x:", x);
}

function bar() {
    x++;
}

// How to run the code in the previous snippet such that bar() executes at the point of the yield inside of *foo()?

//construct an iterator 'it' to control the generator
var it = foo();

//start 'foo()' here!
it.next();
x;          // 2
bar();
x;          // 3
it.next();  // x: 3

// it merely constructs an iterator
// then it.next() begins the call till the yield
// bar() is called to change the value
// it.next() again finishes it

// Input and Output


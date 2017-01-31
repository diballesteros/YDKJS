/*
    Chapter 3: Function vs. Block Scope
                                        */
                                        
/*
    Scope From Functions
                            */
                            
function foo(a) {
    var b = 2;
    
    // some code
    
    function bar() {
        // ...
    }
    
    // more code
    
    var c = 3;
}

/*
    Hiding in Plain Scope
                            */

// Principle of Least Privilege - only expose what is minimally necessary

function doSomething(a) {
    b = a + doSomethingElse( a * 2);
    
    console.log( b * 3 );
}

function doSomethingElse(a){
    return a - 1;
}

var b;

doSomething(2); // 15

// Proper Design with Least Privilege:

function doSomething(a){
    function doSomethingElse(a) {
        return a - 1;
    }
    
    var b;
    
    b = a + doSomethingElse( a * 2);
    
    console.log( b * 3);
}

doSomething(2); // 15

/*
    Collision Avoidance
                        */

function foo(){
    function bar(a) {
        i = 3; // changing the 'i' in the enclosing scope's for-loop
        console.log(a+i);
    }
    
    for( var i=0; i<10;i++){
        bar(i*2); // oops, infinite loop ahead!
    }
}

foo();

// 'i' stays fixed at 3 infinitely because of the declaration in bar(); so the loop is infinite

// Reinstanced the variable "var i = 3;" would solve the issue by "hiding in scope" or using a different identifier entirely but that may be difficult due to software design


// Global "Namespaces"

// Libraries avoid collision by creating an object as a "namespace" that has all the properties as the functionality:

var MyReallyCoolLibrary = {
    awesome: "stuff",
    doSomething: function() {
    // ...
    },
    doAnotherThing: function() {
        // ...
    }
};

// Module Managament

// Using a dependency manager makes it so that libraries have their identifiers imported into another specific scope


/*
    Functions As Scopes
                        */

var a = 2;

function foo() { // <-- insert this
    var a = 3;
    console.log(a); // 3
} // <-- and this
foo(); // <-- and this

console.log(a); // 2

// In order to not pollute the global scope with several scopes then the best solution is expressions:

var a = 2;

(function foo(){ // <-- insert this
    
    var a = 3;
    console.log(a); // 3
    
})(); // <-- and this

console.log(a); // 2

// Anonymous vs. Named

setTimeout( function(){
    console.log("I waited 1 second!");
}, 1000);


// Drawbacks: no useful name to display in stack traces for debugging, have to use a depracted callback for recursions, less readable

// Better to always name them

setTimeout(function timeoutHandler(){ // <-- Look, I have a name!
    console.log("I waited 1 second!");   
}, 1000);

// Invoking functions Immediately (IIFE)

var a = 2;

(function IIFE(){
    
    var a = 3;
    console.log(a); // 3
})();

console.log(a); // 2

// (function(){ .. }()) is also identical and valid

// Could also pass in parameters

var a = 2;

(function IIFE( global ){
 
    var a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
 })( window );

console.log( a ); // 2

// Niche case where undefined but have its identifier value incorrectly overwritten

undefined = true; // setting a land-mine for other code! avoid!

(function IIFE(undefined){
    var a;
    if(a === undefined) {
        console.log("Undefined is safe here!");
    }
})();

// UMD (Universal Module Definition) variation

var a = 2;

(function IIFE(def){
    def(window);
})(function def(global){
    
    var a = 3;
    console.log(a); // 3
    
});

//Passing entire functions as paramaters for the function-expression to make it more readable but more verbose

/*
    Blocks as Scopes
                      */

for(var i=0; i<10, i++){
    console.log(i);
}

//  this for is an example

var foo = true;

if(foo) {
    var bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}

// Example of declaring bar inside a scope to use Principle of Least Privilege

// try/catch the catch portion also creates its own scope

try {
    undefined(); // illegal operation to force an exception!
}
catch(err){
    console.log(err); // works!
}

console.log(err); // ReferenceError: 'err' not found

// "let"

var foo = true;

if(foo) {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}

console.log(bar); // ReferenceError

// The previous example code has "implicit" blocks with the let, a convention to make it more readable with no downside and may make it easier for the whole block to move around when refactoring:

var foo = true;

if(foo) {
    { // <-- explicit block
        let bar = foo * 2;
        bar = something(bar);
        console.log(bar);
    }
}

console.log(bar);

// Important to note hoisting doesn't work with let

{
    console.log(bar); // ReferenceError!
    let bar = 2;
}

//Garbage Collection

function process(data){
    // do something interesting
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt)){
                     console.log("button clicked");
                     }, /*capturingPhase=*/false);

// The engine will keep someReallyBigData around wasting resources so using block-scoping is effective

function process(data) {
    // do something interesting
}

// anything declared inside this block can go away after!
{
    let someReallyBigData = { .. };
    
    process( someReallyBigData );
}

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt){
    console.log("button clicked");
}, /*capturingPhase=*/false);

// "let" loops

for(let i=0; i<10; i++){
    console.log(i);
}

console.log(i); // ReferenceError

// re-binds i for every iteration, another way of illustrating it:

{
    let j;
    for(j=0; j<10;j++){
        let i = j; // re-bound for each iteration!
        console.log(i);
    }
}


/*
    Chapter 4: Hoisting
                          */

/*
    Chicken or The Egg
                        */

a = 2;

var a;

console.log(a);

// Output is 2 because of hoisting, however

console.log(a);

var a = 2;

// Ouput is undefined

/*
    The Compiler Strikes Again
                                */

// First snippet

var a; // This is compiled and "hoisted" first

a = 2;

console.log(a);

// Second Snippet

var a; // This is compiled and "Hoisted" first

console.log(a);

a = 2;

// the egg (declaration) comes before the chicken (assignment)

// Examples:

foo();

function foo(){
    console.log(a); // undefined
    
    var a = 2;
}

// Interpreted as:

function foo(){
    var a;
    
    console.log(a); // undefined
    
    a = 2;
}

foo();

// Function declarations are hoisted but function expressions are not

foo(); // Not reference error, but TypeError!

var foo = function bar() {
  // ...  
};

// var foo is hoisted so no reference error however it still does not have a value when its hoisted so it will create a TypeError

// Also recall that even though it's a named function expression, the name identifier is not available in the enclosing scope

//Example:

foo(); // TypeError
bar(); // ReferenceError

var foo = function bar(){
    //...
};

//Interpreted:

var foo;

foo(); // TypeError
bar(); // ReferenceError

foo function() {
    var bar = ...self...
    // ...
};
    
/*
    Functions First
                    */
    
    //Functions are hoisted first then variables
    
// Example:
    
    foo(); // 1
    
    var foo;
    
    function foo() {
        console.log(1);
    }
    
    foo = function() {
        console.log(2);
    }
    
//Interpreted:
    
    function foo(){
        console.log(1);
    }
    
    foo(); // 1
    
    foo = function(){
        console.log(2);
    };
    
    // var foo is overridden because function comes first
    
    // Subsequent function declarations override previous ones
    
    foo(); //3
    
    function foo() {
        console.log(1);
    }
    
    var foo = function(){
        console.log(2);
    };
    
    function foo(){
        console.log(3);
    }
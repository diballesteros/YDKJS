/*
    Chapter 2: 'this' All Makes Sense Now!
                                            */

/*
    Call-site
                */

// Where its called not declared

// call-stack: stack of functions that have been called to get us to the current moment in execution

function baz() {
    // call-stack is: 'baz'
    // so, our call-site is in global scope
    
    console.log("baz");
    bar(); // <-- call-site for 'bar'
}

function bar() {
    // call-stack is: 'baz' -> 'bar'
    // so, our call-site is in 'baz'
    
    console.log("bar");
    foo(); // <-- call-site for 'foo'
}

function foo(){
    // call-stack is: 'baz' - > 'bar' -> 'foo'
    // so, our call-site is in 'bar'
    
    console.log("foo");
}

baz(); // <-- call-site for 'baz'

// Debugger tool is much better for finding out the entiriety of the call-stack

/*
    Nothing but Rules
                        */

// First Rule: Default Binding

// default catch-all if no other rules apply

function foo() {
    console.log(this.a);
}

var a = 2;

foo(); // 2


// Defaults to the global object, the variables declared in global scope become properites of the global object

// strict mode would not allow this


// Second Rule: Implicit Binding

function foo(){
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
}

obj.foo(); // 2

// When making a context reference to an object, in this case obj then the 'this' refers to that object so this.a is synonymous with obj.a

// Implicitly Lost

function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
}

var bar = obj.foo; // function reference/alias

var a = "oops, global"; // 'a' also property on global object

bar(); // "oops global"

// the call-site of bar is what makes this just a default binding

function foo(){
    console.log(this.a);
}

function doFoo(fn){
    // 'fn' is just another reference to 'foo'
    
    fn(); // <-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // 'a' also property on global object

doFoo(obj.foo); // "oops global"

// Parameter passing is just implicit assignment, end result is the same as the previous snippet

// Third Rule: Explicit Binding

function foo () {
    console.log(this.a);
}

var obj = {
    a: 2
};

foo.call(obj); // 2

// invoking foo with explicit binding by foo.call(..) or apply(..)

// Hard Binding

function foo(){
    console.log(this.a);
}

var obj = {
    a: 2
};

var bar = function(){
    foo.call(obj);
}

bar(); // 2
setTimeout(bar, 100); // 2

// 'bar hard binds 'foo's 'this' to 'obj'
// so that it cannot be overridden
bar.call(window); // 2

//Another Example:

function foo(something){
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function(){
    return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5

// Another way to express this pattern is to create a re-usable helper:

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

// simple 'bind' helper
function bind(fn, obj){
    return function() {
        return fn.apply(obj, arguments);
    };
}

var obj = {
    a: 2
};

var bar = bind(foo, obj);

var b = bar(3); // 2 3
console.log(b); // 5

// ES5 comes with a built-in utility

function foo(something){
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5

// API Call "contexts"

function foo(el){
    console.log(el, this.id);
}

var obj = {
    id: "awesome"
};

// use 'obj' as 'this' for 'foo(..)' calls
[1,2,3].forEach(foo, obj); // 1 awesome 2 awesome 3 awesome

// Fourth Rule 'new' Binding

// Theres no constructor functions, but rather construction calls of functions

function foo(a){
    this.a = a;
}
    
var bar = new foo(2);
console.log(bar.a); // 2

/*
    Everything in Order
                        */

// Which is more precedent, implicit binding or explicit binding?

function foo() {
    console.log(this.a);
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

// Explicit Binding takes precedence over implicit

function foo(something){
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4

// new binding has more precedence over implicit

// new binding takes precedence over explicit

// Determining 'this'

// 1. Is the function called with new?
var bar = new foo();
// 2. is the function called with call or apply?
var bar = foo.call(obj2);
// 3. is the function called with a context?
var bar = obj1.foo();
// 4. Otherwise default the 'this', in strict its undefined otherwise its the global object
var bar = foo();

/*
    Binding Exceptions
                        */
// Ignored 'this'

// Passing a null or undefined as this
function foo() {
    console.log(this.a);
}

var a = 2;

foo.call(null); // 2


/*
    Lexical 'this'
                    */

function foo(){
    //return an arrow function
    return(a) => {
        // 'this' here is lexically adopted from 'foo()'
        console.log(this.a);
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call(obj1);
bar.call(obj2); // 2, not 3!
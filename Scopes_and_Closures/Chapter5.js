/*
   Chapter 5: Scope Closure
                            */

/* Nitty Gritty */

// Definition: Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope

// Example:

function foo() {
    var a =2;
    
    function bar(){
        console.log(a); // 2
    }
    
    bar();
}

foo();

// Example 2:

function foo(){
    var a = 2;
    
    function bar(){
        console.log(a);
    }
    
    return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed.

// Example 3:

function foo(){
    var a = 2;
    
    function baz(){
        console.log(a); // 2
    }
    
    bar(baz);
}

function bar(fn){
    fn(); // look, I saw closure!
}

// Example 4: (indirect)

var fn;

function foo() {
    var a = 2;
    
    function baz(){
        console.log(a);
    }
    
    fn = baz; // assign 'baz' to global variable
}

function bar() {
    fn(); // Look, I saw closure!
}

foo();

bar(); // 2

/*
    Now I Can See
                    */

function wait(message) {
    setTimeout( function timer(){
        console.log(message);
    }, 1000);
}

wait("Hello, closure!");

// IIFE is not an example of closure

/*
    Loops + Closure
                     */

for(var i=1; i<=5, i++){
    setTimeout(function timer(){
        console.log(i);
    }, i*1000);
}

//This will result in 6 being printed 5 times because of the closure the inner scope has over i

// In order to get the intended result you have to create more closured scope

for (var i=1; i<=5; i++){
    (function(){
        setTimeout( function timer(){
            console.log(i);
        }, i*1000);
    })();
}

// This doesn't work because the scope is empty returning 6 5 times, it needs its own copy of the value of i

for(var i=1; i<=5; i++){
    (function(j){
        setTimeout( function timer(){
            console.log(j);
        }, j*1000);
    })(i);
}

// It works!

// Block-scoping revisited

// Using "let" lets you block scope over every iteration

for(var i=1; i<=5; i++){
    let j = i; // yay, block-scope for closure!
    setTimeout( function timer(){
        console.log(j);
    }, j*1000);
}

// Easier implementation:

for (let i=1; i<=5; i++){
    setTimeout(function timer(){
        console.log(i);
    }, i*1000);
}

/*
    Modules
            */

function CoolModule(){
    var something = "cool";
    var another = [1,2,3];
    
    function doSomething(){
        console.log(something);
    }
    
    function doAnother(){
        console.log(another.join( " ! "));
    }
    
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// Module pattern, above is the most common "Revealing Module"

// Essentially the object return value is essentially a public API for the module

// It is not requiered to return an actual object, an inner function could be returned as well

// it could be invoked instantly in a "singleton" fashion:

var foo(function CoolModule(){
    var something = "cool";
    var another = [1,2,3];
    
    function doSomething(){
        console.log(something);
    }
    
    function doAnother(){
        console.log(another.join(" ! "));
    }
    
    return{
        doSomething: doSomething,
        doAnother: doAnother
    }
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// Modules are just functions so they can recieve parameters:

function CoolModule(id){
    function identify() {
        console.log(id);
    }
    
    return{
        identify: identify
    };
}

var foo1() = CoolModule("foo 1");
var foo2() = CoolModule("foo 2");

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"

// Name the returning object as the public API

var foo = (function CoolModule(id){
    function change(){
        // modifying the public API
        publicAPI.identify = identify2;
    }
    
    function identify1(){
        console.log(id);
    }
    
    function identify2(){
        console.log(id.toUpperCase());
    }
    
    var publicAPI = {
        change: change,
        identify: identify1
    };
    
    return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

/*
    Modern Modules
                    */

var MyModules = (function Manager(){
    var modules = {};
    
    function define(name, deps, impl){
        for(var i=0; i<deps.length; i++){
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    
    function get(name){
        return modules[name];
    }
    
    return {
        define: define,
        get: get
    };
})();

// to use it:

MyModules.define("bar", [], function(){
    function hello(who){
        return "Let me introduce: " + who;
    }
    
    return {
        hello: hello
    };
});

MyModules.define("foo", ["bar"]. function(bar){
    var hungry = "hippo";
    
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase());
    }
    
    return {
        awesome: awesome
    };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(
    bar.hello("hippo")
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO


// Future Modules

// Using separate files to create individual modules:

// bar.js

function hello(who){
    return "Let me introduce: " + who;
}

export hello;

// foo.js

// import only 'hello()' from the "bar" module
import hello from "bar";

var hungry = "hippo";

function awesome(){
    console.log(
    hello(hungry).toUpperCase()
    );
}

export awesome;

//Third file

//import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
    bar.hello("rhino")
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO


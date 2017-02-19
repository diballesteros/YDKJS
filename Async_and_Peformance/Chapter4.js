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

function *foo(x,y){
    return x *y;
}

var it = foo(6, 7);

var res = it.next();

res.value();    // 42

// Using yield as an intermediate return

function *foo(x) {
    var y = x * (yield);
    return y;
}

var it = foo(6);

// start 'foo(..)'
it.next();

var res = it.next(7);

res.value;    // 42

// Two way messaging system:

function *foo(x) {
    var y = x * (yield "Hello");    // <-- yield a value!
    return y;
}

var it = foo(6);

var res = it.next();    // first 'next()', don't pass anything
res.value;  // "Hello"

res = it.next(7);   // pass '7' to waiting 'yield'
res.value;  // 42

// Multiple Iterators

function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;    // 2 <-- yield 2
var val2 = it2.next().value;    // 2 <-- yield 2

val1 = it1.next( val2 * 10).value;  // 40 <-- x:20, z:2
val2 = it2.next( val1 * 5).value;   // 600 <-- x:200, z:3

it1.next( val2 / 2);    // y:300
                        // 20 300 3
it2.next( val1 / 4);    // y:10
                        // 200 10 3

// the iterators can interact with one another

/* Generator'ing Values */

// Producers and Iterators

var something = (function (){
    var nextVal;
    
    return {
        // needed for 'for..of'
        [Symbol.iterator]: function(){return this;},
        
        // standard iterator interface method
        next: function(){
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            
            return { done:false, value:nextVal};
        }
    };
})();

something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105

// Above snippet to become new values relate to old produced values

/* Iterating Generators Asynchronously */

function foo(x,y,cb) {
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        cb
    );
}

foo( 11, 31, function(err,text) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(text);
    }
} );

// Using a generator:

function foo(x,y) {
    ajax(
    "http://some.url.1/?x=" + x + "&y=" + y,
        function(err,data){
            if(err) {
                // throw an error into '*main()'
                it.throw(err);
            }
            else {
                // resume '*main()' with received 'data'
                it.next(data);
            }
        }
    );
}

function *main() {
    try{
        var text = yield foo(11,31);
        console.log(text);
    }
    catch(err) {
        console.error(err);
    }
}

var it = main();

// start it all up!
it.next();

// yield allows us to get text back asychronously from an ajax call which is the real amazing part

var text = yield foo(11, 31);
console.log(text);

/* Generators + Promises */

// The natural way to get the most out of Promises and generators is to:
// yield a Promise and wire that Promise to control the generator's iterator

function foo(x,y) {
    return request(
        "http://some.url.1/?x=" + x + "&y=" + y
    );
}

function *main() {
    try {
        var text = yield foo(11, 31);
        console.log(text);
    }
    catch (err) {
        console.error(err);
    }
}

var it = main();

var = it.next().value;

//wait for 'p' promise to resolve
p.then(
    function(text) {
        it.next(text);
    },
    function(err){
        it.throw(err);
    }
);

// There are libraries that implement promise+generator functionalities for you
// Asynquence

// Promise Concurrency in Generators

function *foo() {
    //make both requests "in parallel"
    var p1 = request("http://some.url.1");
    var p2 = request("http://some.url.2");
    
    //wait until both promises resolve
    var r1 = yield p1;
    var r2 = yield p2;
    
    var r3 = yield request(
        "http://some.url.3/?v=" + r1 + "," + r2
    );
    
    console.log(r3);
}

// use previously defined 'run(..)' utility
run(foo);

/* Generator Delegation */

// Yield-delegation

function *foo() {
    console.log("`*foo()` starting");
    yield 3;
    yield 4;
    console.log("`*foo()` finished");
}

function bar*() {
    yield 1;
    yield 2;
    yield *foo(); // `yield`-delegation!
    yield 5
}

it.next().value;    // 1
it.next().value;    // 2
it.next().value;    // `*foo()` starting
                    // 3
it.next().value;    // 4
it.next().value;    // `*foo()` finished
                    // 5

// Purpose is mostly code organization

/* Thunks */
// A function in JS that is wired to call another function, in other words you wrap a function definition around a function call

function foo(x,y) {
    return x + y;
}

function fooThunk() {
    return foo( 3,4 );
}

// later

console.log( fooThunk() ); // 7

// async thunk

function thunkify(fn) {
    var args = [].slice.call(arguments, 1);
    return function(cb) {
        args.push(cb);
        return fn.apply(null, args);
    };
}

var fooThunk = thunkify(foo, 3, 4);

// later

fooThunk( function(sum) {
    console.log(sum);   // 7
});
/*
    Chapter 3: Promises
                            */

/* What is a Promise? */

function add(xPromise, yPromise) {
    // 'Promise.all([..])' takes an array of promises,
    // and returns a new promise that waits on them
    // all to finish
    return Promise.all( [xPromise, yPromise] )
    
    // when that promise is resolved, let's take the
    // received 'X' and 'Y' values and add them together
    .then( function(values){
        // 'values' is an array of the messages from the
        // previously resolved promises
        return values[0] + values[1];
    } );
}

// 'fetchX()' and 'fetchY()' return promises for
// their respective values, which may be ready
// *now* or *later*
add( fetchX(), fetchY() )

// we get a promise back for the sum of those
// two numbers.
// now we chain-call 'then(..)' to wait for the
// resolutation of that returned promise.
.then( function(sum){
    console.log(sum); // that was easier!
} );

// There is a possible rejection handler

add (fetchX(), fetchY() )
.then(
        // fullfillment handler
        function(sum){
            console.log(sum);
        };
        // rejection handler
        function(err) {
            console.error(err); // bummer!
        }
    );

// A promise is externally immutable once resolved, meaning it cannot be modified but it can be viewed by other parties

// Completion Event

function foo(x) {
    // Start doing something that could take a while
    
    // make a 'listener' event notification
    //capability to return
    
    return listener;
}

var evt = foo(42);

evt.on("completion", function(){
    // now we can do the next step!
} );

evt.on("failure", function(err){
    // oops, something went wrong in 'foo(..)'
} );

// In promise structure:

function foo)(x){
    // start doing something that could take a while
    
    // construct and return a promise
    return new Promise( function(resolve,reject){
        // eventually, call 'resolve(..)' or 'reject(..)',
        // which are the resolution callbacks for
        // the promise
    } );
}

var p = foo(42);

bar(p);

baz(p);

// What bar() may look like:

function bar(fooPromise){
    // listen for 'foo(..)' to complete
    fooPromise.then(
        function(){
            // 'foo(..)' has now finished, so
            // do 'bar(..)''s task
        },
        function(){
            //oops, something went wrong in 'foo(..)'
        }
    );
}

// ditto for 'baz(..)'

// Another Approach:
function bar() {
    // 'foo(..)' has definitely finished, so
    // do 'bar(..)''s task
}

function oopsBar() {
    // oopsm something went wrong in 'foo(..)',
    // so 'bar(..)' didn't run
}

// ditto for 'baz()' and 'oopsBaz()'

var p = foo(42);

p.then(bar, oopsBar);

p.then(baz, oopsBaz);

/* Thenable Duck Typing */

// If it looks like a duck, and quacks like one its a duck

if (
    p !== null &&
    (
        typeof p === "object" ||
        typeof p === "function"
    ) &&
    typeof p.then === "function"
) {
    // assume it's a thenable!
}
else {
    // not a thenable
}

// Problem with possible objects and functions who have a then property that doesn't have anything to do with promises
// Can happen in old libraries

/* Promise Trust */

// Callback trust issues:
// Call the callback too early
// call the callback too late (or never)
// Call the callback too few or too many times
// Fail to pass along any necessary environment/parameters
// Swallow any errors/exceptions that may happen

// Calling too Early

// Even a promise fulfilled immediately (like new Promise(function(resolve{ resolve(42);}))) cannot be observed synchronously
// .then(..) will always be called synchronously

// Calling too late

// By virtue of working like Jobs it'll call immediately at the next available moment


// Never calling the Callback

// a utility for timing out a Promise
function timeoutPromise(delay) {
    return new Promise( function(resolve,reject){
        setTimeout(function(){
            reject("Timeout!");
        }, delay);
    } );
}
                       
// setup a timeout for 'foo()'
Promise.race( [
    foo(), // attempt 'foo()'
    timeoutPromise(3000) // give it 3 seconds
] )
.then(
    function(){
        // 'foo()' fulfilled in time!
    },
    function(err){
        //either 'foo()'rejected, or is it just
        // didn't finish in time, so inspect
        // 'err' to know which
    }
);

// Calling too few or Too many times

// Too few same as 0
// Too many, Promise only allows the first resolution

// Failing to Pass Along any Parameters/Environment

// Can only be passed onto fulfillment or rejection, and the parameters within resolve(..) and reject(..), only the first is accepted the rest are silently ignored

// Swallowing Any Errors/Exceptions

// Any JS exception/error will reject the Promise

/* Chain Flow */

var p = Promise.resolve(21);

var p2 = p.then( function(v){
    console.log(v); //21
    
    //fulfill 'p2' with value '42'
    return v * 2;
} );

// chain off 'p2'
p2.then( function(v){
    console.log(v); // 42
} );

// Without having to create intermediate variables:

var p = Promise.resolve(21);

p
.then(function(v){
    console.log(v); // 21
    
    // fulfill the chained promise with value '42'
    return v * 2;
} )
// here's the chained promise
.then( function(v){
    console.log(v); // 42
} );

// Terminology: Resolve, Fulfill, and Reject

var p = new Promise( function(X,Y){
    // X() for fulfillment
    // Y() for rejection
} );

// reject(..) is almost always used because its the only thing it can do

/* Error Handling */

// Error handling with promises is error prone

/* Recap */

// Promise.resolve(..) and Promise.reject(..)

var p1 = new Promise( function(resolve, reject){
    reject("Oops");
});

var p2 = Promise.reject("oops");

// Promise.resolve unwraps thenable values

var fulfilledTh = {
    then: function(cb) { cb(42);}
};

var p1 = Promise.resolve(fulfilledTh);
var p2 = Promise.resolve(rejectedTh);

// 'p1' will be a fulfilled promise
// 'p2' will be a rejected promise

// then(..) and catch(..)

p.then(fulfilled);

p.then(fulfilled, rejected);

p.catch(rejected); // or 'p.then(null,rejected)'

// Promise.all([..]) and Promise.race([..])
// Promise.all([..]) all the promises you pass in must fulfill for the returned promise to fulfill
// Promise.race([..]) only the first promise to resolve "wins"
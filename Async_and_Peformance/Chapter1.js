/*
    Chapter 1: Asynchrony: Now & Later
                                        */

/* A Program in Chunks */

// ajax(..) is some arbitrary ajax function given by a library
var data = ajax("http://some.url.1");

console.log(data);
// Oops! 'data' generally won't have ajax results

// Not necessarily the best for ajax to wait for results:

ajax("http://some.url.1", function myCallBackFunction(data){
     
     console.log(data); // Yay, I gots me some 'data'!
     } );

 // Asynchrony example:

// Now:
function now(){
    return 21;
}
//Now:
function later(){
    // Later:
    answer = answer * 2;
    console.log("Meaning of life:", answer);
}
// Now:
var answer = now();
// Now:
setTimeout(later, 1000); // Meaning of life: 42

// Async Console

var a = {
    index: 1
};

// later
console.log(a); // ??

// even later
a.index++;

// It's possible that different browsers handle it differently
// and that sometimes a.index++ will occur before the console output, in these cases its better to snapshot
// and serialize the string with JSON.stringify(..)

/* Event Loop */

// Psuedo code example:
// 'eventLoop' is an array that acts as a queue (first-in, first-out)
var eventLoop = [];
var event;

// keep going "forever"
while(true){
    // perform a "tick"
    if(eventLoop.length > 0){
        //get the next event in the queue
        event = eventLoop.shift();
        
        // now, execute the next event
        try {
            event();
        }
        catch(err){
            reportError(err);
        }
    }
}

/* Parallel Threading */

var a = 20;

function foo() {
    a = a +1;
}

function bar() {
    a = a * 2;
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo);
ajax( "http://some.url.2", bar);

// Run-to-Completion
// JS is atomic so once a chunk starts its entire code runs until its finished however the ordering of the chunks is still nondeterministic
// This is called race condition

/* Concurrency */

// When the two processes don't interact then nondeterminism doesn't matter

// Interaction

var res = [];

function response(data){
    res.push(data);
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);

// Have to add coordinated interaction

var res = [];

function response(data) {
    if (data.url == "http://some.url.1") {
        res[0] = data;
    }
    else if(data.url == "http://some.url.2") {
        res[1] = data;
    }
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

// Sometimes the concurrency is always broken

var a, b;

function foo(x) {
    a = x * 2;
    baz();
}

function bar(y) {
    b = y * 2;
    baz();
}

function baz() {
    console.log(a + b);
}

// ajax(..) is some arbitrary Ajax function given by a library 
ajax("http://some.url.1", foo);
ajax("http://some.url.2", bar);

// Adding a condition to verify if b and a already exist can avoid this

function foo(x) {
    a = x * 2;
    if(a && b) {
        baz();
    }
}

/* Cooperation */

var res = [];

// 'response(..)' receives array of results from the Ajax call
function response(data) {
    // add onto existing 'res' array
    res = res.concat(
        // make a new transformed array with all 'data' values doubled
        data.map( function(val){
            return val * 2;
        })
    );
}

//ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);

// In order to keep the page loaded from the array possibly being loaded with millions of results its possible to split it up into chunks

var res = [];

// 'response(..)' receives array of results from the Ajax call
function response(data) {
    // let's just do 1000 at a time
    var chunk = data.splice(0, 1000);
    
    // add onto exisint 'res' array...
}

/* Jobs */

// At the end of every tick of the eventloop have a task guaranteed (do later, but as soon as possible)
/*
    Chapter 5: Program Performance
                                    */

/* Web Workers */

// An environment like the browser can provide multiple instances of the JavaScript engine

var w1 = new Worker("http://some.url.1/mycoolworker.js");

// Workers do not share any scope or resources
// Instead have a basic event messaging mechanism

// w1 Worker object is an event listener and trigger

w1.addEventListener("message", function(evt){
    // evt.data
});

//Sending a message event to the worker

w1.postMessage("something cool to say");

// Inside the worker, the messagining is totally symmetrical

addEventListener("message", function(evt){
    // evt.data
});

postMessage("a really cool reply");

/* Worker Environment */

// You can perform network operations (Ajax, WebSockets) and set timers

// Could also load extra JS scripts
importScripts( "foo.js", "bar.js");

// Data transfer --> Passing Objects
// Structured Cloning Algorithm
// Transferable Objects

/* Shared Workers */
// Centralizing a working so all the page instances can share 

var w1 = new SharedWorker("http://some.url.1/mycoolworker.js");

// Shared workers use 'ports' to communicate

w1.port.addEventListener("message", handleMessages);

// ..

w1.port.postMessage("something cool");

//Intialization
w1.port.start();

//inside the shared Worker
addEventListener("connect", function(evt){
    // the assigned port for this connection
    var port = evt.ports[0];
    
    port.addEventListener("message", function(evt){
        // ..
        
        port.postMessage(..);
        
        // ..
    } );
    
    // initialize the port connection
    port.start();
} );

/* asm.js */
// Highly optimizable subset of JS by carefully avoiding certain mechamisms and patterns that are hard to to optimize
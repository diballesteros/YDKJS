/*
    Chapter 6: Benchmarking & Tuning
                                        */

/* Benchmarking */

// The wrong approach:

var start = (new Date()).getTime(); // or 'Date.now()'

// do some operation

var end = (new Date()).getTime();

console.log("Duration:", (end-start));

/* Benchmark.js */

function foo() {
    // operation(s) to test
}

var bench = new Benchmark(
    "foo test",     // test name
    foo,            // function to test (just contents)
    {
        // ..       // optional extra options (see docs)
    }
);

bench.hz;           // number of operations per second
bench.stats.moe;    // margin of error
bench.stats.variance; // variance across samples
// ..

/* Context is King */

// Engine Optimizations
// Test real code, not snippets under as best of real conditions as possible

/* jsPerf.com */
// Uses Benchmark.js to run statistically accurate and
// reliable tests

/* Writing Good Tests */
// Be clear on the details on intentional and unintentional differences, again avoid narrowing down on specific snippets without context

/* Tail call optimization (TCO) */

//Requiered optimzation as of ES6 that will make recursive patterns practical in JS. 
//Allows a function call in the tail position of another function to execute without needing any extra resources
// Which means no arbitrary restrictions on call stack depth for recursive algorithms
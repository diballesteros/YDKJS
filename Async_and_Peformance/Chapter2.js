/*
    Chapter 2: Callbacks
                            */

/* Continuations */

// A
ajax("..", function(..){
    // C
} );
// B

// "Do A, setup the timeout for 1,000 milliseconds, then do B, then after the timeout fires, do C." -- Deficient in explaining what happened above

// Nested/Chained Callbacks

listen( "click". function handler(evt){
    setTimeout( function request(){
        ajax("http://some.url.1", function response(text){
            if (text === "hello") {
                handler();
            }
            else if( text === "world") {
                request();
            }
        } );
    }, 500);
} );

// Pyramid of Doom, Actual function call order:

doA(function(){
    doC();
    
    doD(function (){
        doF();
    })
    
    doE();
});

doB();

// However, D might happen synchronously which causes several issues, all in all callbacks can create several problems that mapping with our brain can be hard
// This is essentially "callback hell"

/* Trust Issues */

// Third-party utilites can create a multitude of bugs with callbacks, so logic has to be implemented to fix them and create safeguards
// Even our own code should be protected with safe inputs

function addNumbers(x, y) {
    // ensure numerical input
    x = Number(x);
    y = Number(y);
    
    // + will safely do numeric addition
    return x + y;
}

addNumbers( 21, 21); // 42
addNumbers(21. "21"); // 42
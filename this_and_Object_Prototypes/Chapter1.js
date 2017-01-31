/*
    Chapter 1: this or That?
                                */

function identify() {
    return this.name.toUpperCase();
}

function speak(){
    var greeting = "Hello, I'm" + identify.call(this);
    console.log(greeting);
}

var me = {
    name: "Kyle"
};

var you = {
    name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER

// Mechanism provides cleaner API design and easier re-use

// Similar to, but without the advantages of:

function identify (context){
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm " + identify(context);
    console.log(greeting);
}

identify(you); // READER
speak(me); // Hello, I'm KYLE

/*
    Confusions
                */

// Two common misconceptions

// Itself

// "this" does not let the function reference itself

// Example

function foo(num) {
    console.log("foo: " + num);
    
    // keep track of how many times 'foo' is called
    this.count++;
}

foo.count = 0;

var i;

for(i=0;i<10;i++){
    if(i > 5){
        foo(i);
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was 'foo' called?
console.log(foo.count); // 0 -- WTF?


// To fix using this:

function foo(num) {
    console.log("foo: " + num);
    
    //keep track of how many times 'foo' is called
    // Note: 'this' IS actually 'foo' now, based on
    // how 'foo' is called (see below)
    this.count++;
}

foo.count = 0;

var i;

for(i=0; i<10; i++){
    if(i>5){
        // using 'call(..)' we ensure 'this'
        //points at the function object ('foo') itself
        foo.call(foo,i);
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was 'foo' called?
console.log(foo.count); // 4

// Second misconception is "Its Scope"

// Tries, and failes to refer to its lexical scope:

function foo(){
    var a = 2;
    this.bar();
}

function bar(){
    console.log(this.a);
}

foo(); //undefined

//"this" is a binding that is made when a function is invoked, and what it references is determined entirely by the call-site where the function is called
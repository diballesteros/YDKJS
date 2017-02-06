/*
    Chapter 5: Prototypes
                            */

/* [[Prototype]]*/

// objects in JS have an internal property, which is a reference to another object, typically non-null

var myObject = {
    a: 2
};

myObject.a; // 2

//

var anotherObject = {
    a: 2
};

// create an object linked to 'anotherObject'
var myObject = Object.create(anotherObject);

myObject.a; // 2

// Ejemplo for..in

var anotherObject = {
    a: 2
};

// create an object linked to 'anotherObject'
var myObject = Object.create(anotherObject);

for(var k in myObject) {
    console.log("found: " + k);
}
// found: a

("a" in myObject); // true


/* Object.prototype */

// Setting & Shadow Properties

myObject.foo = "bar";

// If myObject has a normal data accessor property for 'foo' it'll simply change the value, otherwise if it doesn't find it in the [[Prototype]] chain then it'll create the property however if it does find it higher up in the chain thats when the behavior changes

// Three scenarios where its higher on the chain and not on 'myObject'

// 1. If a normal data accessor property this isnt read only (writable: false) then a new property called 'foo' is added into myObject resulting in a shadowed property

// 2. if its read-only its disallowed, in strictmode an error is thrown

// 3. if the 'foo' higher in the chain is a setter then no foo will be shadowed on myObject nor will the foo setter be redefined

// Shadowing, like explicit psuedo-polymorphism is complicated and costly, so best to avoid when possible

var anotherObject = {
    a: 2
};

var myObject = Object.create(anotherObject);

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty("a"); // true

// Causes an 'a' to be created for myObject there stopping the shadowing, only way to avoid this and still increment is 'anotherObject.a++'

/* "Class" */

// "Class Functions"

function Foo() {
    // ...
}

Foo.prototype; // { }

// Every object created from 'new Foo()' will be arbitarily linked to "Foo dot prototype"

function Foo(){
    // ...
}

var a = new Foo();

Object.getPrototypeOf(a) === Foo.prototype; // true

// No copying is done but a common link is created 

// "Constructors"

function Foo() {
    // ...
}

var a = new Foo();

// Makes us think its a "class" becuase of the class-oriented language semantics of "new"

function Foo() {
    // ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true

// "Constructor call"

//Example code:

function NothingSpecial() {
    console.log("Don't mind me!");
}

var a = new NothingSpecial();
// "Don't mind me!"

a; // {}

// Important: Functions aren't constructors however function calls with 'new' are "constructor calls"

// Mechanics

function Foo(name){
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

var a = new Foo("a");
var b = new Foo("b");

a.myName(); // "a"
b.myName(); // "b"

// 1. Trick is the this binding on Foo
// 2. Second trick is attempting to use prototype

// "Constructor" Redux

function Foo() { /* .. */}

Foo.prototype = { /* .. */ }; // create a new prototype object

var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!

// Goes up the chain and since Foo doesnt actually have a .constructor either, so only the global Object has it


// Misconception, busted.
// You can add it back manually through the .defineproperty but its more work and doesn't solve the original issue

/* "(Prototypal) Inheritance"*/

function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

// here, we make a new 'Bar.prototype'
// linked to 'Foo.prototype'
Bar.prototype = Object.create(Foo.prototype);

// Beware! now 'Bar.prototype' constructor is gone,
// and might need to be manually "fixed" if you're
// in the habit of relying on such properties

Bar.prototype.myLabel = function() {
    return this.label;
};

a.myName(); // "a"
a.myLabel(); // "obj a"

// Following two approaches don't work like you want or with dangerous side-effects

Bar.prototype = Foo.prototype;

Bar.prototype = new Foo();

/* Inspecting "Class" Relationships */

Foo.prototype.isPrototypeOf(a); // true

// isPrototypeOf(); checked the entire[[Prototype]] chain of a to see if Foo.prototype appears

// It is also possible to retrieve the [[Prototype]] of an object

 Object.getPrototypeOf(a);

Object.getPrototypeOf(a) === Foo.prototype; // true

/* Object Links */

// 'Create()'ing links

var foo = {
    something: function() {
        console.log("Tell me something good...");
    }
};

var bar = Object.create(foo);

// Object.create(..) creates a new object (bar) linked to the object (foo) which gives us all the power (delegation) of [[Prototype]]

// Link as Fallbacks?

var anotherObject = {
    cool: function() {
        console.log("cool!");
    }
};

var myObject = Object.create(anotherObject);

myObject.cool(); // "cool!"

// Trying to use a fallback will work by virtue of [[Prototype]] however its best to avoid for readability and maintainability of the code
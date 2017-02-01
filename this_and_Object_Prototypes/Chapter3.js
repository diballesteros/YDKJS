/*
    Chapter 3: Objects
                        */

/*
    Syntax
            */
// Literal syntax

var myObj = {
    key: value
    // ...
};

// Constructed form

var myObj = new Object();
myObj.key = value;

// Best practice is to use literal


/*
    Type
            */

// 6 types: string, number, boolean, null, undefined, object

// Built-in Objects: String,Number, Boolean, Object, Function, Array, Date, RegExp, Error

// Example:

var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false

var strObject = new String("I am a string");
typeof strObject; // "object"
strObject instanceof String; // true

// inspect the object sub-type
Object.prototype.toString.call(strObject); // [object String]

// Functions over strings can only be done over the object form not the primitive form however when it the functionality is called it coerces the primitive into object

// Most prefered by the JS community is the literal form

var strPrimitive = "I am a string";

console.log( strPrimitive.length); // 13

console.log(strPrimitive.charAt(3)); // "m"

/*
    Contents
              */

// Identifiers and References

var myObject = {
    a: 2
};

myObject.a; // 2

myObject["a"]; // 2

//

var wantA = true;
var myObject = {
    a: 2
};

var idx;

if(wantA){
    idx = "a";
}

// later

console.log(myObject[idx]); // 2

// Example of array indexes:

var myObject = {};

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"]; // "foo"
myObject["3"]; // "bar"
myObject["[object Object]"]; // "baz

// Property vs. Method

// Even if you get a function from accessing a property its not a method its just considered property access

function foo() {
    console.log("foo");
}

var someFoo = foo; // variable reference to 'foo'

var myObject = {
    someFoo: foo
};

foo; // function foo(){..}
someFoo; // function foo(){..}
myObject.someFoo // function foo(){..}

/*
    Arrays
            */

var myArray = ["foo", 42, "bar"];

myArray.length; // 3

myArray[0]; // "foo"

myArray[2]; // "bar"

// Arrays are objects so properties can be added

myArray.baz = "baz";

myArray.length; // 3

myArray.baz; // "baz"

// if the property is a number it will add to the array

/*
    Duplicating Objects
                         */

function anotherFunction() {/*..*/}

var anotherObject = {
    c: true
};

var anotherArray = [];

var myObject = {
    a: 2,
    b: anotherObject, // reference, not a copy!
    c: anotherArray, // another reference!
    d: anotherFunction
};

anotherArray.push(anotherObject, myObject);

// So it wasnt duplicated! Two types of duplications: shallow which means jsut the object and variables but not other references as it could cause circular traverseal and deep copy which would try to copy everything

// Different frameworks have tried to solve the issue of a deep copy (JSON solution):

var newObj = JSON.parse(JSON.stringify(someObj));

// For shallow copies ES6 has a new functionality Object.assign()

var newObj = Object.assign({}, myObject);

newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true

/*
    Property Descriptors
                         */

var myObject = {
    a: 2
};

Object.getOwnPropertyDescriptor(myObject, "a");
// {
//      value: 2,
//      writable: true,
//      enumerable: true,
//      configurable: true
//}

//Example of Object.defineProperty(..)

var myObject = {};

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

myObject.a; // 2

// Writable: ability to change the value of a property

var myObject = {};

Object.definePropertyt( myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
});

myObject.a = 3;

myObject.a; // 2

// changing the writable property while using strict mode and then trying to change the value will result in a TypeError

// Configurable: ability to modify its descriptor definition

var myObject = {
    a: 2
};

myObject.a = 3;
myObject.a; // 3

Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurable: false, // not configurable!
    enumerable: true
});

myObject.a; // 4
myObject.a = 5;
myObject.a; // 5

Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true
}); // TypeError

// Making configurable false also prevents 'delete' from working on object properties

// Enumerable: controls if a property will show up in certain object-property enumerations such as the for..in loop

/*
    Immutability
                    */

// If an object has a reference to another object the contents can still be changed with the approaches from before:

myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; // [1,2,3,4]

// Object Constant: By combining writeable: false and configurable: false you can create a constant (Cannot be changed, redefined or deleted)

// Prevent Extensions: prevent adding new properties

var myObject = {
    a: 2
};

Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b; // undefined

// In nonstrictmode it fails silently but in strict mode it returns a TypeError

// Seal: Object.seal(..) Calls 'preventExtensions(..)' on the object and configurable: false so you cannot add anymore properties or reconfigure/delete any existing properties

// Freeze: Object.freeze(..) calls Object.seal(..) on the object but also marks all "data accessor" properties as writeable:false

/*
     [[Get]]
                */

// If the property is not found then returns undefined, however this can create confusion:

var myObject = {
    a: undefined
};

myObject.a; // undefined
myObject.b; // undefined

/*
    [[Put]]
             */
// Different from simply setting based on if the property is already present or not

// If the property is present:
// 1. is the property an accessor descriptor?
// 2. Is the property a data descriptor with writable of false? if so silently fail in nonstrict and TypeError in Strictmode
// 3. Otherwise, set the value to the existing property as normal

/*
    Getters & Setters
                        */

// When a property is defined to have getter/setter its definition becomes an "accessor descriptor", value and writable become moot but get 'get' 'set' and keep configurable and enumerable

var myObject = {
    // define a getter for 'a'
    get a(){
        return 2;
    }
};

Object.defineProperty(
    myObject, // target
    "b",      // property name
    {         // descriptor
        //define a getter for 'b'
        get: function(){return this.a * 2},
        
        // make sure 'b' shows up as an object property
        enumerable: true
    }
);

myObject.a; // 2

myObject.b; // 4

// getter hardcodes to return the function and its value

var myObject = {
    //define a getter for 'a'
    get a(){
        return 2;
    }
};

myObject.a = 3;

myObject.a; // 2

// To avoid this also add in the setter

var myObject = {
    // define a getter for 'a'
    get a(){
        return this._a_;
    },
    
    // define a setter for 'a'
    set a(val){
        this._a_ = val * 2;
    }
};

myObject.a = 2;

myObject.a; // 4

/*
    Existence
                */

// Askihng if an object has a certain property without asking for it's value

var myObject = {
    a:2
};

("a" in myObject); // true
("b" in myObject); // false

myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false

// Enumeration

var myObject = {};

Object.defineProperty(
    myObject,
    "a",
    //make 'a' enumerable, as normal
    { enumerable: true, value: 2}
);

Object.defineProperty(
    myObject,
    "b",
    // make 'b' NON-enumerable
    { enumerable: false, value 3}
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty("b"); // true

// ......

for(var k in myObject){
    console.log(k, myObject[k]);
}
// "a" 2

// 'b' exists but is not shown through the for..in loop

// for loops for traditional index iteration, for..in loops only for objects

/*
    Iteration
                */

var myArray = [1,2,3];

for(var i = 0; myArray.length; i++){
    console.log(myArray[i]);
    }
// 1 2 3

//forEach(..) will iterate over all the values in the array ignoring any callback return values

// every(..) keeps going until the end or the callback reutrns a false

//some(..) keeps going until the end or the callback returns a true value

// for..of iterates directly over the values as opposed to the indices

var myArray = [1,2,3];

for( var v of myArray){
    console.log(v);
}
// 1
// 2
// 3
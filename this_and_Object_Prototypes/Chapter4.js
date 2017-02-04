/*
    Chapter 4: Mixing (Up) "Class" Objects
                                            */

/*
    Class Theory
                    */

// OOP - Proper design is to package up the data and the behavior together (e.g. data structures)

// Classes to classify certain data structures, Cars are a type of Vehicle, each with their own behaviors and methods

// Polymorphism - the idea that a general behavior from a parent class can be overridden in a child class to give it more specifics

/*
    Class Design Pattern
                         */

// Multiple types of design patterns like "functional programming" and "object oriented programming"

/*
    JavaScript "Classes"
                         */

// JavaScript does not have classes

// JavaScript have some utilites to satisfy the desire to code with a class design pattern but its optional

/*
    Class Mechanics
                    */

// Building

// A class is a blue-print, to get an object we must build (aka "instantiate")

// Constructor

class CoolGuy {
    specialTrick = nothing


CoolGuy(trick){
    specialTrick = trick
}

showOff(){
    output("Here's my trick: ", specialTrick)
}

}

// To "make" a CoolGuy "instance" we call the class constructor

Joe = new CoolGuy("jumping rope")

Joe.showOff() // Here's my trick: jumping rope


/*
    Class Inheritance
                        */

// Psuedo-code:

class Vehicle {
    engines = 1
    
    ignition() {
        output("Turning on my engine.")
    }

    drive(){
        ignition()
        output("Steering and moving forward!")
    }
}

class Car inherits Vehicle {
    wheels = 4
    
    drive(){
        inherited: drive()
        output("Rolling on all ", wheels, " wheels!")
    }
}

class SpeedBoat inherits Vehicle {
    engines = 2
    
    ignition() {
        output("Turning on my ", engines, " engines.")
    }
    
    pilot(){
        inherited:drive()
        output("Speeding through the water with ease!")
    }
}

// Polymorphism

// Any method can reference another method at a higher level of the inheritance hierarchy

// Class inheritance implies copies, no link between parent and child

// Multiple Inheritance

// JS does not provide native mechanism for "multiple inheritance" (e.g. multiple parents)

/*
    Mixins 
            */

// Faking the missing copy behavior of classes in JavaScript

// Explicit Mixins

// vastly simplified 'mixin(..)' example:

function mixin(sourceObj, targetObj) {
    for(var key in sourceObj) {
        // only copy if not already present
        if(!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    
    return targetObj;
}

var Vehicle = {
    engines: 1;
    
    ignition: function() {
    console.log("Turning on my engine");
},
    
    drive: function() {
        this.ignition();
        console.log("Steering and moving forward!");
    }
};

var Car = mixin(Vehicle, {
    wheels: 4,
    
    drive: function() {
        Vehicle.drive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    }
});

// Since classes aren't being dealt with anymore important to note its objects being copied

// Functions are not duplicated but rather references to the functions are copied

// "Polymorphishm" Revisited

// Vehicle.drive.call(this);
// Explicit pseudo-polymorphism is done here, Vehicle.drive(); is an absolute call to the object's function drive however to avoid 'this' pertaining to the Vehicle you must use .call(this) to make refer to 'Car'

// Should be avoided because its more complex, harder-to-read and harder-to-maintain, costs outweigh the benefits

// Mixing Copies

// Recalling the mixin(..) from above

//vastly simplified 'mixin()' example:
function mixin(sourceObj, targetObj){
    for (var key in sourceObj){
        // only copy if not already present
        if(!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    
    return targetObj;
}

// mixin comes from mixed-in cause of the mixed in properties, its possible to avoid the check and just create the object but its less safe

// Parasitic Inheritance

// Popularized by Douglas Crockford

// "Traditional JS Class" 'Vehicle'

function Vehicle() {
    this.engines = 1;
}
Vehicles.prototype.ignition = function() {
    console.log("Turning on my engine.");
};
Vehicle.prototype.drive = function() {
    this.ignition();
    console.log("Steering and moving forward!");
};

// "Parasitic Class" 'Car'
function Car() {
    // first, 'car' is a 'Vehicle'
    var car = new Vehicle();
    
    // now, let's modify our 'car' to specialize it
    car.wheels = 4;
    
    // save a privileged reference to 'Vehicle::drive()'
    var vehDrive = car.drive;
    
    // override 'Vehicle::drive()'
    car.drive = function(){
        vehDrive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    };
    
    return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!


/*
    Implicit Mixins
                     */

var Something = {
    cool: function(){
        this.greeting = "Hello World";
        this.count = this.count ? this.count + 1 : 1;
    }
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
    cool: function() {
        // implicit mixin of 'Something' to 'Another'
        Something.cool.call(this);
    }
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with 'Something')

// Avoid when possible
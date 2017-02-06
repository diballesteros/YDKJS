/*
    Chapter 6: Behavior Delegation
                                    */

/* Towards Delegation-Oriented Design */

// Class Theory

//Pseudo-Code for Class Design

/*
class Task {
    id;
    
    // constructor 'Task()'
    Task(ID) { id = ID; }
    outputTask() { output(id); }
}

class XYZ inherits Task {
    label;
    
    // constructor 'XYZ()'
    XYZ(ID, Label) { super(ID); label=Label;}
    outputTask() { super(); output(label);}
}

class ABC inherits Task {
// ...
}
*/

// Delegation Theory

// Instead define an Object, Task, and it will have concrete behavior on it that includes utility methods that various tasks can use (read: delegate to!) Then for each task you define an object to hold that task-specific data/behavior
// You LINK your task-specific object(s) to the 'Task' utility Object allowing them to delegate to it when they need to

var Task = {
    setID: function(ID) { this.id = ID;},
    outputID: function(){console.log(this.id);}
};

//make 'XYZ' delegate to 'Task'
var XYZ = Object.create(Task);

XYZ.prepareTask = function(ID, Label){
    this.setID(ID);
    this.label = Label;
};

XYZ.outputTaskDetails = function(){
    this.outputID();
    console.log(this.label);
};

// ABC = Object.create(Task);
// ABC ... = ...

// Behavior delegeation means: let some object (XYZ) provide a delegation (to 'Task') for property or method references if not found on the object (XYZ)

// Instead of vertical Parent-Child relationship its better to think of it as peers standing side by side going any direction delegation is necessary

// Mutual Delegation (Disallowed)

// Not possible to link b to a then a to b cause of possible infinite loops

// Mental Models Compared

// 1st model is the "Prototypal" OO Style
function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1= new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();

// OLOO Style coding

var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};

var Bar = Object.create( Foo );

Bar.speak = function() {
    alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();
b2.speak();

// Still 3 objects linked to eachother but more simplification all around

/* Classes vs. Objects */

// Typical scenario with concrete code

// Widget "Classes"

// Example code uses jQuery

//Parent class
function Widget(width,height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}

Widget.prototype.render = function($where){
    if(this.$elem){
        this.$elem.css( {
            width: this.width + "px",
            height: this.height + "px"
        } ).appendTo($where);
    }
};

// Child Class
function Button(width,height,label){
    // "super" constructor call
    Widget.call(this,width,height);
    this.label = label || "Default";
    
    this.$elem = $( "<button>" ).text( this.label );
}

// make 'button' "inherit" from 'Widget'
Button.prototype = Object.create(Widget.prototype);

// override base "inherited" 'render(..)'
Button.prototype.render = function($where) {
    // "super" call
    Widget,prototype.render.call(this, $where);
    this.$elem.click( this.onClick.bind(this) );   
};

Button.prototype.onClick = function(evt) {
    console.log( "Button '" + this.label + "' clicked!" );
};

$( document ).ready( function(){
    var $body = $( document.body );
    var btn1 = new Button(125, 30, "Hello");
    var btn2 = new Button(150, 40, "World");
    
    btn1.render( $body );
    btn2.render( $body );
} );

// OLOO Style:

var Widget = {
    init: function(width, height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where){
        if(this.$elem) {
            this.$elem.cs( {
                width: this.width + "px",
                height: this.height + "px"
            } ).appendTo($where);
        }
    }
};

var Button = Object.create(Widget);

Button.setup = function(width,height,label){
    // delegated call
    this.init(width,height);
    this.label = label || "Default";
    
    this.$elem = $( "<button>" ).text( this.label );
};
Button.build = function($where) {
    // delegated call
    this.insert($where);
    this.$elem.click( this.onClick.bind( this ) );
};

Button.onClick = function(evt) {
    console.log( "Button '" + this.label + "' clicked!");
};

$( document ).ready( function(){
    var $body = $(document.body);
    
    var btn1 = Object.create( Button );
    btn1.setup(125,30,"Hello");
    
    var btn2 = Object.create( Button );
    btn2.setup(150, 40, "World");
    
    btn1.build($body);
    btn2.build($body);
} );

// Separates construction and initilization of the variable buttons, Widget is a utility collection object

/* Simpler Design */

// Scenario: two controller objects, one for handling the login form of a web page and another for actually handling the authentication with the server

// Class Design Example:
// Base functionality in a Controller class and two child classes LoginController and AuthController

//Parent class
function Controller() {
    this.errors = [];
}
Controller.prototype.showDialog = function(title, msg) {
    // display title & message to user in dialog
};
Controller.prototype.success = function(msg) {
    this.showDialog("Success", msg);
};
Controller.prototype.failure = function(err) {
    this.errors.push( err );
    this.showDialog( "Error", err);
};


// Child class
function LoginController() {
    Controller.call( this );
}
// Link child class to parent
LoginController.prototype = Object.create( Controller.prototype );
LoginController.prototype.getUser = function() {
    return document.getElementById( "login_username").value;
};
LoginController.prototype.getPassword = function() {
    return document.getElementById( "login_password" ).value;
};
LoginController.prototype.validateEntry = function(user,pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();
    
    if(!(user && pw)){
        return this.failure("Please enter a username & password!");
    }
    else if(pw.length < 5) {
        return this.failure( "Password must be 5+ characters!");
    }
    
    // got here? validated
    return true;
};
// Override to extend base 'failure()'
LoginController.prototype.failure = function(err) {
    // "super" call
    Controller.prototype.failure.call(this, "Login invalid: " + err);
};

// Child class
function AuthController(login) {
    Controller.call(this);
    // in addition to inheritance, we also need composition
    this.login = login;
}
// Link child class to parent
AuthController.prototype = Object.create( Controller.prototype );
AuthController.prototype.server = function(url,data) {
    return $.ajax( {
        url: url,
        data: data
    });
};
AuthController.prototype.checkAuth = function() {
    var user = this.login.getUser();
    var pw = this.login.getPassword();
    
    if(this.login.validateEntry(user pw)){
        this.server("/check-auth", {
            user: user
            pw: pw
        })
        .then(this.success.bind(this))
        .fail( this.failure.bind(this));
    }
};
//Override to extend base 'success()'
AuthController.prototype.success = function(){
    // "super" call
    Controller.prototype.success.call(this, "Authenticated!");
};
// Override to extend base 'failure()'
AuthController.prototype.failure = function(err){
    // "super" call
    Controller.prototype.failure.call(this, "Auth Failed: " + err);
};

var auth = new AuthController(
    // in addition to inheritance, we also need composition
    new LoginController()
);
auth.checkAuth();

// De-class-ified OLOO Pattern

var LoginController = {
    errors: [];
    getUser: function() {
    return document.getElementById("login_username").value;
    },
    getPassword: function() {
        return document.getElementById("login_password").value;
    },
    validateEntry: function(user,pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        
        if(!(user && pw)) {
            return this.failure( "Please enter a username & password!");
        }
        else if (pw.length < 5) {
            return this.failure("Password must be 5+ characters!");
        }
        
        // got here? validated!
        return true;
    },
    showDialog: function(title,msg) {
        // display success message to user in dialog
    },
    failure: function(err){
        this.errors.push(err);
        this.showDialog("Error", "Login invalid: " + err);
    }
};

// Link 'AuthController' to delegate to 'LoginController'
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function() {
    var user = this.getUser();
    var pw = this.getPassword();
    
    if(this.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw: pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this));
    }
};
AuthController.server = function(url,data){
    return $.ajax( {
        url: url,
        data: data
    });
};
AuthController.accepted = function() {
    this.showDialog("Success", "Authenticated!")
};
AuthController.rejected = function(err){
    this.failure("Auth Failed: " + err);
};

// No new to instantiate AuthController because its an object

AuthController.checkAuth();

// If more objects need to be created in the delegation chain

var controller1 = Object.create(AuthController);
var controller2 = Object.create(AuthController);
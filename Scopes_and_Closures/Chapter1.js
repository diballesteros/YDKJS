/*
    Compiler Theory
                    */

// Take-away: JS is compiled right before execution

/*
    Understanding Scope
                        */

// Conversation

//Cast: Engine, Compiler, Scope

var a = 2;

// Compiler first consults scope to see if var a has been declared yet or not, if it is it ignores it if not then it asks Scope to declare a new variable called a for that scope collection

// Compiler produces code for Engine to later execute

// Summary: compiler declares a variable, then when executing engine looks up the variable in scope and assigns to it, if found (error if not)

// LHS: Looking up the variable
// RHS: Looking up the value


// Quiz

function foo(a) {
    var b = 2;
    return a + b;
}

var c = foo(2);

// Identify all the LHS look-ups: 1. var c =  2. var b = 2 3. foo(2);

// Correct Answers: (Answers were correct but formatting was not) c = .., a = 2 (implicit param assignment) and b = ..

// Identify all the RHS look-ups: 1. foo(); 2. var b = >a< 3. a + b 4. a + b

// Correct Answers: (Again correct but formatting was not) foo(2.., = a;, a + .. and .. + b

/*
    Nested Scope
                    */

// The engine will continue to ask Scope more and more outer limits if it cannot find what its looking for

/*
    Errors
              */


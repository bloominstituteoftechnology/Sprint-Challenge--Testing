<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

Mocha provides hooks before(),beforeEach(),afterEach(), after(). Hooks will run tin the order they are defined. These should be used as as preconditions and clean after your tests.

2. What is the point of Test Driven Development? What do you personally think about this approach?
    In my view, TDD helps to focus on one functionality and get it passing instead of thinking the whole application.
    TDD results in fewer bugs and makes application robust.  

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    A test spy is a function that records arguments, return value, the value of 'this' and exception thrown for all its calls.  
    Spies gives information about function calls, without affecting their behavior.

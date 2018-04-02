<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

'before' is run once before all the tests in a 'describe()' and 'after' is run once after all the tests in a describe(). 'beforeEach' is run before each test in a describe, and 'afterEach' after each test. They are used depending on what you're wanting to test for. For example, opening a connection or adding a user.


2. What is the point of Test Driven Development? What do you personally think about this approach?

The point of TDD is to write out all the tests beforehand and then program the app to pass the tests as guidance. To me this approach is the most intuitive if  testing is a must have for a company.


3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A 'spy' is a function that records arguments, return values, value of 'this' and errors for all it's calls. We can use it as an anonymous function:

var callback = sinon.spy();
Function.subscribe('message', callback);
assertTrue(callback.called);

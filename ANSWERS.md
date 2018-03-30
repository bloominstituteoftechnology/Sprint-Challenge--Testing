<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

2.  What is the point of Test Driven Development? What do you personally think about this approach?

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

1)  The Before and After are used to run pieces of code before and after the test code. BeforeEach and AfterEach run after the describe.

2.  Test driven development's point is to verify that the code you run does what it is supposed to do.

3.  The spy in sinon creates an anonymous function that allows it to take in arguments, exceptions, this, and the final return values for all calls.

<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
- In brief, before is run once before all the tests in a describe and after is run once after all the tests in a describe, whereas beforeEach is run before each test in a describe, and afterEach after each test. Which one you want to use depends on your actual test.

2. What is the point of Test Driven Development? What do you personally think about this approach?
- Test Driven Development helps in developing application without bugs. It tests the app for bugs and probable mistakes before it is given to a user. It gives us a testable code.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
- spy offers information about a function call withouth changing there behaviour. a spy can be used to help verify things, such as whether a function was called or not. The function sinon.spy returns a Spy object, which can be called like a function, but also contains properties with information on any calls made to it.

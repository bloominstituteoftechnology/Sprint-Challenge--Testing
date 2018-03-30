# Answers

1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

    + The differences between before, after, beforeEach, and afterEach is that they are hooks that exist in different parts of the lifecycle and are triggered at specified times.

        + before - called before all tests
        + beforeEach - called before each test
        + after: called after all tests
        + afterEach: called after each test

2. What is the point of Test Driven Development? What do you personally think about this approach?

    + Test driven development (TDD) is a practice in software engineering where tests are coded before the actual application code is worked on. The purpose of TDD is to make the code clearer, simple and bug free. Personally, once I get used to writing tests first, I believe that it will allow for better code because I would be coding within a framework that I created and should keep everything more focused.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

    + A test spy is a function that offer information about function calls without manipulating their behavior. They can also be used to verify whether a function was called or not. Spies can be passed to the function that handles a callback to effectively test it. 
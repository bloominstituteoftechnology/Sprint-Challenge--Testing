<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
    - **`before`:** This is a hook used to set up preconditions that will trigger prior to all other tests within a `describe` block.
    - **`after`:** This hook fires off after all tests within a single block have run, and is used to clean things up (e.g. drop a testing databse).
    - **`beforeEach`:** This hook runs before each individual test within a single `describe` block, setting up conditions for those tests.
    - **`afterEach`:** This hook runs after each individual test within a block, and provides a similar function as `after`, which is cleaning up following a test.

2. What is the point of Test Driven Development? What do you personally think about this approach?
    - It keeps a project within scope and allows for the creation of testable code, which can then be refactored and improved on to pass specific test cases. However, this is heavily dependent on well-written tests.
    - My personal thoughts on this approach is that it is likely excellent for larger projects with well-defined requirements and needs, however writing code to pass pre-determined tests seems like it could potentially stifle creativity, and may be less useful on the smaller scale.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
    - A function which records data during testing, such as arguments, returns, `this` value, and any exceptions. A `spy` can be passed to a function as a `callback` and then used to report on how it was handled.
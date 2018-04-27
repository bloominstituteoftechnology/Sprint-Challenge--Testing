<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

Before is done before all the tests in the block; it's run first. beforeEach is done before each test block. afterEach is done after each test block. After is done last, after all tests are run.

2. What is the point of Test Driven Development? What do you personally think about this approach?

Test driven development is a methodology of how to write good software. In test driven development the tests for a given software are written before the project is written. It's an iterative process of passing tests and then writing new tests for new features.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A spy is basically a filler function. The spy can be anonymous or wrapped around an existing function. The spy can be used to effectively test a callback by putting the spy function in place of the callback function. The spy can then record information, such as how many times it's called. This is useful, because it lets the developer know what is happening to the real callback function.

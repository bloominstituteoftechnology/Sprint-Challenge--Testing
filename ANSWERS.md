<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* `before` is run at the beginning of the test suite before any describe blocks
* `after` is run at the end of the test suite after all describe blocks
* `beforeEach`is run at the beginning of each describe block
* `afterEach` is run at the end of each describe block


2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD is a strategy in which tests are built first before functioning code, as to provide a framework for how the final product should operate. The actual code is written around the tests instead of vice versa.


3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
 A `spy` replaces a cb, so the `spy` works in the same exact way that a cb would be except that it provides  information about the cb, like how many times it was called what was passed into it

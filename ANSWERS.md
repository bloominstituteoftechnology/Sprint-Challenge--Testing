<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

`before` runs before all the tests. `beforeEach` runs before each test. `after` runs after all the tests `afterEach` runs after each test.

2. What is the point of Test Driven Development? What do you personally think about this approach?

It can lead to more modular, less buggy/more predictable code more efficiently. So far I think its an awkward and unintuitive way to work and basically involves you to think through your entire function before actually writing it, and I often change things or notice edge cases once I write them down.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

Spies are tools to inspect/watch (spy on) function calls, see information like how often they were called and with what arguments, errors etc. You test a callback like any other function, we set the callback to be a `sinon.spy`, invoke it and test to expect what happened to be what should have happened
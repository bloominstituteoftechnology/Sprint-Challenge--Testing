1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

`before` is run once before all the tests in a `describe` and `after` is run once after all the tests. `beforeEach` is run before each test and `afterEach` after each test. Which one you want to use depends on your actual test; `before` and `after` are better suited for single instances, whereas `beforeEach` and `afterEach` allows modification.

2. What is the point of Test Driven Development? What do you personally think about this approach?

TDD requires first writing a test that fails before writing the functional code. 

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

A `spy` is a function that records arguments, return values, the value of `this` and any exceptions thrown for all calls. 
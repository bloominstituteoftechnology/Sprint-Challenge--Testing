<!-- Answers to the Short Answer Essay Questions go here -->

### 1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* `before` runs once before any of the tests in the testing suite
* `after` runs once after all of the tests in the suite have been run.
* `beforeEach` runs before every single test in the suite.
* `afterEach` runs after every single test in the suite.

### 2. What is the point of Test Driven Development? What do you personally think about this approach?

* TDD is a development process where the tests are built first. It gives you a road map of what the final built component/request should accomplish.

### 3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* The `sinon.spy()` can keep track of valuable information when testing callbacks. Most notably, the result of the callback as well as how many times the callback was invoked.

<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });


2. What is the point of Test Driven Development? What do you personally think about this approach?

The main reason of going with TDD is the developer writes the test before writing the actual code. 
This way the developer can know whether his code works or not.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

By using `spy` in `sinon` we are able to write tests using callbacks.
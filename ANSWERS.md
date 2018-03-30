<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?
 
 According to the Mocha documentation, 'before, after, beforeEach and afterEach" are hooks that run and execute logic in different blocks of the testing file. 
 `before` runs before all tests in a given function block and is only called once before the testing file is executed.
 `after`  runs after all tests in a given function block and is only called once after the testing file is executed.
 `beforeEach` runs before each test in a given function block or each test that matches the beforeEach hook. 
 `afterEach` runs after each test in a given function block or each test that matches the afterEach hook.

2. What is the point of Test Driven Development? What do you personally think about this approach?

  Test Driven Development is where you write a test for development of application source code. 
  Test-driven development (TDD) has multiple tests which start with adding a test to  

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

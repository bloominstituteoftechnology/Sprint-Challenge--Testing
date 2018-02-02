1. In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?

  The before, after, beforeEach, afterEach hooks are run in their respetive order of a describe block. Before runs before all tests are run in the block, after runs after all tests etc etc. You use these hook to setup precoditions of your tests or in the case of after, after the tests to clean up any code left behind from the respective test or tests.

2. What is the point of Test Driven Development? What do you personally think about this approach?

  The point of TDD is to write a test or tests describing the out come of your code before you write the actual code. To test for the outcome of your code is to almost work backwards from solution to problem. I think TDD is a great idea in theory but, I've never worked on a code base big enough to be worth the effort or time to write them.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

  A spy is a function that keeps track of what's put into the function your spying on and the return value of that function.
In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?
  Before and after run before and after the entire test suite. beforeEach and afterEach run before and after each individual test.

What is the point of Test Driven Development? What do you personally think about this approach?
  The point is to have tests to ensure functionality stays in place as a code base grows. It also ensures that each individual unit is tested as the code is written.

What is a spy in sinon? How do we use it to effectively test a callback?
  A spy is a function that you can pass other functions into to test for different properties such as a call count.
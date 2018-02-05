1. In Mocha, what are the differences between before after beforeEach afterEach? When do they run? What are they used for?

Answer: 
`before` hook is running before any tests in each `describe()` block runs. It also runs before the first `beforeEach()` hook.
`after` hook is running after all the `describe()` complete the tests. It also runs after the last `afterEach()` hook runs.
`beforeEach` hook is running before each test in a `describe()` block.
`afterEach` hook is running after each test in a `describe()` block.
`before` is used for connecting and initializing the test database, while `after` is used for clearing up and disconnecting the test database.
`beforeEach` is used for preparing the test data in the test database, while `afterEach` is used for clearing up the test data in the test database.

2. What is the point of Test Driven Development? What do you personally think about this approach?

Answer: TDD can produce applications of high quality in less time than is possible with older methods. TDD creates a regression test suite as a side effect that can minimize human manual tests, while finding problems earlier, leading to quicker fixes. The methodical nature of TDD ensures much higher coverage and first-time quality than classic phased code-test-fix-retest cycles. 

3. What is a spy in sinon? How do we use it to effectively test a callback?

Answer: Spy is a function that records arguments, return value, the value of `this` and exception thrown for all its calls. 
We can initialize the anonymous spy function and pass it to the function that is going to handle the callback. Spy won't do anything except record information about its calls. And we can use assertions or expectation to test the call count that spy records.
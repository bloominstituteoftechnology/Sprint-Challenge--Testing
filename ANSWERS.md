<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll runs once before all of the tests in a file. Similarly, afterAll will run once after all of the tests are complete. On the other hand, beforeEach and afterEach run once for each tests. They allow you to repeat the same setup/teardown for each individual test, whereas before/afterAll is used for one-time setup/teardown.

1. What is the point of Test Driven Development? What do you personally think about this approach?
TDD is an approach that ensures that your code has 100% testing coverage. That way, if anything breaks due to changes, the tests will catch it. It also ensures that code behaves the way you expect given specific examples.

1. What is a mock function? How do we use it to test a callback passed to a function?
A mock function is like a copy of an existing function that allows you to access certain properties of that function, such as specific calls to the function, return values, number of calls, etc. It basically spies on the function to give insight into what is going on that can't be "seen"

1. Mention three types of tests.
- Unit tests
- Component tests
- Integration tests

1. What type of test performs database operations against a real server.
Integration tests

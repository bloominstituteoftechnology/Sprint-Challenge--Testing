<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
afterAll= Runs a function after all the tests in this file have completed. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

afterEach = Runs a function after each one of the tests in this file completes. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

beforeAll = Runs a function before any of the tests in this file run. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running tests.

beforeEach = Runs a function before each of the tests in this file runs. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running the test.

1. What is the point of Test Driven Development? What do you personally think about this approach?
test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle. 
i personally think that testing is important for deveploper to check and recheck work. i personally do not enjoy it but if it pays well enough i can learn to love it..

1. What is a mock function? How do we use it to test a callback passed to a function? Mock Functions. Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than just testing the output.

1. Mention three types of tests.
unit testing
integration testing
system testing


1. What type of test performs database operations against a real server.
Integration Testing

<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll-runs a function before all of the tests in the file run.
afterAll-runs a function after all of the tests in the file run.
beforeEach-runs a function before any of the tests in the file run.
afterEach-runs a function before any of the tests in the file run.

These are useful in case you want to clean up some global setup state that is shared across tests.

2. What is the point of Test Driven Development? What do you personally think about this approach?
Its an approach to programming that encourages developers to write tests of their code before actually writing that code itself. Its a way of turning your ode into an instruction manual for itself.

I definitely see the value of this approach, especially if the people writing tests are those in charge of product. It can help provide some clarity and guidance to developers, so they are able to be as productive as possible.

3. What is a mock function? How do we use it to test a callback passed to a function?
Mock Functions allow us to test links between code by erasing the actual implementation of a function, and allowing test time configuration of return values.

4. Mention three types of tests.
Client Testing, React Testing, Server Testing

5. What type of test performs database operations against a real server.
Integration test?
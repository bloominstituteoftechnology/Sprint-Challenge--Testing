<!-- Answers to the Short Answer Essay Questions go here -->

1. In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

Before and after run on the ends of the entire testing environment, setting up initial conditions like server connections, then dropping db collections and disconnecting. BeforeEach and afterEach are setup and teardown conditions for each test suite, making sure that testing conditions are discrete and known from test to test.

2. What is the point of Test Driven Development? What do you personally think about this approach?

The point of Test Driven Development is to ensure that each feature and operation is functional by writing just enough production code to fulfill a test case. I like TDD because it is useful for both specifying and validating the operations of your code, but without any supplemental BDD conceptual framework it is incomplete.

3. What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

In Sinon, a spy is a callBack function that tracks how its called. By passing sinon.spy() as a callback argument, we can then test assertions about how many times it was called `expect('callBack').to.have.callCount($count)`, or as well as what it was called with, etc.
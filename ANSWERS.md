<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for? 
BeforeEach and afterEach run on the ends of the entire testing environment, setting up initial conditions like server connections, then dropping db collections and disconnecting. BeforeEach and afterEach are setup and teardown conditions for each test suite, making sure that testing conditions are discrete and known from test to test.

1. What is the point of Test Driven Development? What do you personally think about this approach? Test driven development is used to help with consistancy and speed up the pipeline due to less debugging time. personally I think it is useful but tedious and would rather use tests already made than write my own.

1. What is a mock function? How do we use it to test a callback passed to a function? Mock functions make it easy to test the links between code by erasing the actual implementation of a function.

1. Mention three types of tests. unit test, Back end testing, Alpha testing.

1. What type of test performs database operations against a real server.
Back end testing.
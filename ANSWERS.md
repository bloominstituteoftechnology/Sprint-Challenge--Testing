<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

Theese test funtions are used to run tests around a given testing environment. They are used to set up preconditions and clean up after tests.
`before` and `after` run on the ends of the entire testing environment, setting up initial conditions like server connections, then dropping data base collections and disconnecting. `beforeEach` and `afterEach` are setup and teardown conditions for each test suite, making sure that testing conditions are discrete and known from test to test. For example we used `before` once to clear the initial data base to then run other tests so dumplicate data would not send errors, then we turned it off so we could run the rest of our codes. 
1. What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Developmemt(TDD) is a software development process that is used to repeat small development cycles. They are used to test specific tests in your code outside of the area they are called. 
TDD is very useful to help ensure features are efficiently functioning and to try to account for user issues(Behavior Driven Development (BDD)). The associated software is helpful in analyzing what is working and what is not. I could, however, see issues if the testing system is bypassing somthing or if the tests are not set up to properly run through their target codes and giving false positives. We touched on tesing within server funcitons themselves, so having these in both places seems redundant. Defi

1. What is a mock function? How do we use it to test a callback passed to a function?
A `mock funciton` is a dummy or spy test funtion that can test the funcitonality of code functions in a number of ways. It can monitor them, set up a dummy instance of them and even check run times for given function. 
An example test with a callback sent to a function could be: 
`const mockCallback = jest.fn();
forEach([0, 1], mockCallback);
expect(mockCallback.mock.calls.length).toBe(2);`
Here the foreach method was called 2 times. Additional expect test statements could be written to test other aspecs of the test. 
1. Mention three types of tests.
Three types of tests include: .toBe(); .toEqual(); and .toBeTruthy(). 
1. What type of test performs database operations against a real server.
Server side tests that target CURD operations after defining a server source. 

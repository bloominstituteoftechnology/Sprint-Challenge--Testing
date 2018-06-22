<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

The obvious differences between these global methods is the timing of when they are called during the testing. `beforeAll` is called before *any* test is run, whereas `beforeEach` is called before *each* test is run. The same is true for after: `afterAll` is called after *all* tests are run, and `afterEach` is called after *each* test is run.

These methods exist because they allow setup and teardown. The before methods allow one to set up the test environment before the tests are run, like setting up the state, or creating dummy data in a DB, etc. The after methods allow you to dismantle everything you've set up in the test and return everything to pre-test condition, like deleting said dummy data, or resetting the state to default. The use of the methods together allow you to create isolated tests and eliminate side effects from testing.

1. What is the point of Test Driven Development? What do you personally think about this approach?

**Test Driven Development** (*TDD*) is a development style in which you create tests for your code *before* you write the actual code itself. Then as you write the code, you check if the tests you wrote before are passing. 

I think the points of TDD are to:

* Think about how your application works

  You need to think about how your application will work, and what kind of outputs it will produce given a set of inputs. This kind of thinking is necessary to write any test at all, especially before the code even exists.
* Write less code with less fluff

  This is because you write only enough code for the test to pass.
* Provide greater coverage

  Because the tests came first, and the code is written around the tests, the tests are more likely to "cover" more of what the app is doing.

1. What is a mock function? How do we use it to test a callback passed to a function?

A mock function is a *noop* function. It doesn't output anything. However, in Jest, the mock function can keep track of useful statistics, such as how many times it was called, and the context it was called in. This allows us to test things like if a higher order function (*HOF*) is appropriately invoking a callback function.

You can test that by substituting the actual function the HOF calls with the mock function. Then, when the HOF runs, the mock function will record if it's been called, and how many times it was called. This allows us to see if the HOF if actually calling the callback.

1. Mention three types of tests.

* Unit Testing
* Integration Testing
* Snapshot Testing

1. What type of test performs database operations against a real server.

Integration testing.
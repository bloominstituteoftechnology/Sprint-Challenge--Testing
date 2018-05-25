<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    *beforeAll - runs before any of the tests in the suite are run, this can be used to connect to a db before testing
    *beforeEach - runs before each of the tests are run, this can be used to set up the scenario for the test you are about to run
    *afterEach - runs after each test is run, this can be used to clean up / reset anything affected by the test
    *afterAll - runs after all the tests in the suite have been run, can be used to clean up everything done by the tests like clear a testdb or disconnect from a db
1. What is the point of Test Driven Development? What do you personally think about this approach?
    This ensures that the code we are writing is not only working, but also returning the data we are expecting. In some cases, an error isnt because the code is wrong but the data being sent is wrong, this can help us narrow down exactly what components have the issue. Although it may not be necessary in small projects but as an application grows and components become abundant, this may seem tedious but can save lots of time/effort in the long run
1. What is a mock function? How do we use it to test a callback passed to a function?
    "spies" that allow you to see the behavior of a function in a test instead of just looking at the final output. When we pass it into a function, we can later look at the state of the mock fn() to make sure it was invoked as intended (.mock.calls.length / .mock.calls[0][0]/ .mock.returnValues[0] etc.)
1. Mention three types of tests.
    *Unit Testing - used to make sure each individual component is performing properly, being the smallest part of an app it is also the fastest to test
    *Integration Testing - This is when different modules are combined and tested as a group. This occurs after unit testing; since each individual module had no issue they are then checked to see no interaction issues
    *End to End Testing - this checks to see if any issue occurs when running an app from start to finish, mainly to check if the flow of data is working properly. Because this covers all the modules, this is a SLOW test and is not run on a frequent basis.
1. What type of test performs database operations against a real server.
    Unit Testing / Scenario
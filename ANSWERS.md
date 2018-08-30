<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    beforeAll, afterAll are run before & after the test suites. beforeEach, afterEach are run before & after each individual test in the scope in which they are declared.  These functions are used to create data on which to perform CRUD operations with the test suites. 

2. What is the point of Test Driven Development? What do you personally think about this approach?

    TDD is a developerment paradigm of writing tests before any code relating to those test is written. This allows for a red, green, refactor pattern of development whereby code is written to satisfy tests, and then refactored to streamline readability and reusability.

3. What is a mock function? How do we use it to test a callback passed to a function?

    Mock functions, otherwise known as "spies", allow you to observe the behavior of functions that are indirectly called by other functions by capturing the function calls and parameters passed to those functions. To use a mock function to test a callback, you can replace the callback with a mock function, and test its various properties such as number of times called, or parameters passed to the function.

4. Mention three types of tests.

    Unit Tests = Tests focusing on a contained portion of a program, which are usually quick to write and implement.
    Integration Tests = Tests which focus on combining modules of a program, which are more difficult to implement and debug but are great at detecting program regressions.
    Performance Tests = Tests that measure the CPU cycles required to execute a particular program.

5. What type of test performs database operations against a real server.

    Integration Tests or Load Tests



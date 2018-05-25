<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    beforeAll executes before any test in a suite runs.
    afterAll executes after all tests in a suite have run.

    beforeEach executes before each individual test.
    afterEach executes after each individual test.

    These methods are referred to as globals and are often used to clean up state shared between inidividual tests.

1.  What is the point of Test Driven Development? What do you personally think about this approach?

    The point of TDD is to design and build software according to specific test cases and only writing more code to pass new tests.

    I believe this approach can reduce the amount of bugs in application I write at the cost of increasing development time.

1.  What is a mock function? How do we use it to test a callback passed to a function?

    A mock function is a function that allows you to monitor the behavior of a function that is called by other code. Mocks allow you to simulate function calls as if you called them in the application.

1.  Mention three types of tests.

    Component Tests examine the appearance and functionality of a component. They are very sensitive to small changes in UI and fail at higher frequencies which allows developers to find UI bugs.

    Snapshot Tests take snapshots of components and each snapshot is compared to the previos one. Snapshots evolve with the code that is written which makes it easy to spot regressions.

    End to end testing examine the behavior of the entire application. This type of testing is based on how users would use an application and if they can accomplish certain tasks.

1.  What type of test performs database operations against a real server.

    Integration testing performs database operations against a real server.

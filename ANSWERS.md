<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

    * `beforeAll` runs prior to some testing segment. it can be used to connect to a database or define some variable(s)
    * `afterAll` runs after a testing segment has completed. it can be used to disconnect from a database or to reset some value(s)
    * `beforeEach` is invoked prior to each individual test. it can be used to populate fresh data.
    * `afterEach` is invoked after each individual test has concluded. it can be used to reset database values.

2. What is the point of Test Driven Development? What do you personally think about this approach?

    * to enhance one's understanding of the application at hand and to avoid any regressions. i think testing will be much more useful on larger scale applications.

3. What is a mock function? How do we use it to test a callback passed to a function?

    * a mock function is a duplicate of a block of code that has no implementation. it can be used to simplify testing a reduce side effects. `mockCallback = jest.fn()`

4. Mention three types of tests.

    * unit testing. component testing. snapshot testing.

5. What type of test performs database operations against a real server.

    * superset
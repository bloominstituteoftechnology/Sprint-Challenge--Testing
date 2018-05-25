<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    A: beforeAll triggers before any tests starts, afterAll triggers after all tests are done, beforeEach triggers before each single test launches, afterEach triggers after each test finishes running.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
    First Tests, then writing application based on them. At first glance it might seem redudant and weird, but if You got tests and know what to expect writing app will be much easier.

3.  What is a mock function? How do we use it to test a callback passed to a function?
    Mock can act as a function and be passed to objects that expect a function. For example we can do window.alert = jest.fn(); and then pass it down for tests. Mocks allows us to "spy" on functions and see how many times they were called.

4.  Mention three types of tests.
    Units, Integration, End to Endm Component.

5.  What type of test performs database operations against a real server.

Integration

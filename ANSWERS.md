<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

BeforeAll runs before first before any other tests are run, but it only runs once. It is used to define tests that need to always be run before any of the other tests, but which do not need to be run before each specific testing instance.

BeforeEach runs before each test within a testing instance. It is used to perform an action before every single testing instance, and repeats itself before the next test is run.

AfterAll runs once after all other tests in a testing instance have been run. It may be used as a final check or validation, or to disconnect us from the testing instance.

AfterEach runs once after each testing instance.


1. What is the point of Test Driven Development? What do you personally think about this approach?

Test Driven Development is a framework for developing software based around specific tests. It requires developers to consider the tests and requirements the end product should have, and code for those specific tests. It helps developing teams focus on key features around tests which can ensure quality and succinctness of code.

1. What is a mock function? How do we use it to test a callback passed to a function?

Mock functions help test links between code and allowing test-time configuration of return values. The mock functions capture the callbacks passed to a function, and enable us to run tests on those callbacks.

1. Mention three types of tests.

Unit, client, server

1. What type of test performs database operations against a real server.

Unit testing
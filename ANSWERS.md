<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll,
beforeEach, and afterEach? When do they run? What are they used for?

BeforeAll is used for testing and setting up the testing environment like for instance connecting to the database

afterAll is like beforeAll in that it does general actions after this testing instance is complete like disconnecting from the database

Before Each - is used to setup some type of enviroment or values before each test. like creating a value on the database or in memory that helps validate the tests

afterEach is like BeforeEach in that it relates to each test but it is useful in cleaning up the information that was used to validate the tests because a model that was used to validate the tests might not need to be saved to the running instance of the app
1. What is the point of Test Driven Development? What do you personally think about this approach?

the point of test driven devvelopment is that when you are defining the requirements of a project or feature that you understand the end state that you desire and that these end states then allow you to reap the benefits on a team that mean if someone else changes something they get feedback in the form of tests explaining errors and that these were designed for a purpose.

I dont know how i feel about it yet. its really hard


1. What is a mock function? How do we use it to test a callback passed to a function?
a mock function allows us to test scenarios across multiple tests without duplicate code. 

1. Mention three types of tests.
Unit tests, integration tests, performance tests

1. What type of test performs database operations against a real server.
integration tests?
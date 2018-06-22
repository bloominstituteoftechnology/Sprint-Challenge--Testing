<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
Setup and teardown are use cases for all of the above. beforeAll and AfterAll run once before and after the tests are run, beforeEach and afterEach run before and after each test. before and afterAll are useful for connecting and disconnecting to a db for testing, if you only need to connect once. If you need to connect for each test then beforeEach and afterEach is the way to go.

2. What is the point of Test Driven Development? What do you personally think about this approach?
To make sure you right only the tests you need to, also I imagine it is useful so you don't forget to write tests. I think it is a good philosophy, it is tedious though.

3. What is a mock function? How do we use it to test a callback passed to a function?
    It is a fake function that you can use to inspect the mock's state and insure the callback is invoked properly. set a mock callback equal to a jest.fn() and then just pass it in as you would with a normal callback in the test.

4. Mention three types of tests.
unit tests, integration tests, and component tests?

5. What type of test performs database operations against a real server.
integration test
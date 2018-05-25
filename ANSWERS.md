<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    beforeAll - the inital setup, runs before the block of all tests.
    afterAll - the opposite of beforeAll, runs after all tests are complete.
    beforeEach - runs before every test individually.
    afterEach - opposite of beforeEach, runs after every test individually.

1. What is the point of Test Driven Development? What do you personally think about this approach?
    The point is to give you better feedback on when something breaks in your code instantly,
    before you've gotten too far away to quickly fix the issue. Doing so could potentially
    save you a lot of time in debugging code.

1. What is a mock function? How do we use it to test a callback passed to a function?
    A mock function is something you can send in to whatever you're testing to ensure that
    it's following the correct orders, not just bypassing certain important requirements.

1. Mention three types of tests.
    Unit tests, component tests, snapshot tests.

1. What type of test performs database operations against a real server.
    Functional test

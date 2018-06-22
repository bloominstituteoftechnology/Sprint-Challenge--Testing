<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    A: If you have some work you need to do repeatedly for many tests, you can use beforeEach and afterEach. In some cases, you only need to do setup once, at the beginning or end of a file. Jest provides beforeAll and afterAll to handle this situation.

2.  What is the point of Test Driven Development? What do you personally think about this approach?
    A: It allows you to automate your tests which should improve the speed of running those tests. It should also lead to you having better quality code and more maintainable code for future developers. I think the idea behind it is obviously great and seems to be proven.

3.  What is a mock function? How do we use it to test a callback passed to a function?
    A: Mock functions make it easy to test the links between code by erasing the actual implementation of a function, capturing calls to the function and allowing test-time configuration of return values.

4.  Mention three types of tests.
    A: unit tests, integration tests, and component tests.

5.  What type of test performs database operations against a real server.
    A: server testing using supertest.

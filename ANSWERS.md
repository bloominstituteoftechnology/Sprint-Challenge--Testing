<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

- The difference between the four functions is when they are run and how often. The beforeAll and beforeEach helper function is ran before the test as setup. The difference is the beforeEach is ran repeatedly as the test is being conducted. The afterAll and afterEach is ran after the test (an example would be clearing a database being used again for testing).

1. What is the point of Test Driven Development? What do you personally think about this approach?

- Test Driven Development is meant to drive production through short/small checkpoints, which determines implementation based on tests passing/failing. This allows for thorough development to ensure that bugs are handled during production as much as possible. Personally, this approach is overwhelming for a beginner but has merit based on its principles. 

1. What is a mock function? How do we use it to test a callback passed to a function?

 A mock function is a function that looks into the behavior of another function without having it implemenent. It isolates what is happening in that specific part of the implementation and simulates its actions in the mock function. It is used to test a callback passed to a function by storing it inside a mock function and checks the mock's state to ensure the callback is invoked properly.

1. Mention three types of tests.

    1. Unit Testing
    2. Component Testing
    3. Snapshot Testing

1. What type of test performs database operations against a real server.

Server testing

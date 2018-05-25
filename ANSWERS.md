<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
In Jest beforeEach and afterEach are used to invoke individual tests beforeEach provides data while afterEach resets values. beforeAll runs prior to testing to connect and define variables while afterAll runs after testing to disconnect adn reset variables.
1. What is the point of Test Driven Development? What do you personally think about this approach?
Driven development reduces bugs in code and keeps code consistent with developers. I agree with the approach for a large project with a multitude of people keeping it consistent and easy read would be undeniably beneficial.
1. What is a mock function? How do we use it to test a callback passed to a function?
A mock function is code that is not implemented, and is used to reduce side effects of testing.
1. Mention three types of tests.
Unit testing, server testing, snapshot testing
1. What type of test performs database operations against a real server.
Unit testing creates a database and tests against a real server.
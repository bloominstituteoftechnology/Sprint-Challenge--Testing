<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll executes before the first test, after all executes after the last test, beforeEach executes before each test, afterEach executes after each test

1. What is the point of Test Driven Development? What do you personally think about this approach?
So that as you scale a project you don't have to spend all of your time manually testing. Tedious but worth it I guess.

1. What is a mock function? How do we use it to test a callback passed to a function?
Mock functions are executed for testing. They occur within a 'isolated container' so-to-speak, in order to determine the success/failure of that component alone. We use it to test a callback passed function by passing in a mock?

1. Mention three types of tests.
Unit Test, Component Test, Snapshot Test

1. What type of test performs database operations against a real server.
Component Test
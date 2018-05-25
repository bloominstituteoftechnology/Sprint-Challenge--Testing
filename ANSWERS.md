<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll runs before any of the tests and can be used for setup. afterAll runs after all the tests and can be used for cleanup. beforeEach runs once before each test does and can be used to populate temporary variables. afterEach runs after each test and can be used for unloading or individual cleanup.
1. What is the point of Test Driven Development? What do you personally think about this approach?
Test Driven Development is the concept of writing tests first and then coding until they all pass. I think this can be a powerful practice in many situations because it gives a scaffolding to write your code within.
1. What is a mock function? How do we use it to test a callback passed to a function?
A mock function interfaces with the testing code in place of the actual function. The mock function can be designed to return a callback in a manner similar to the original.
1. Mention three types of tests.
Unit tests, Component tests, and Server tests
1. What type of test performs database operations against a real server.
Server tests
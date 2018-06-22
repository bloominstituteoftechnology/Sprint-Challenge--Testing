<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for? -- beforeAll runs one time before any tests run and is used for any code that only needs to run once, like connecting to a database. afterAll runs one time after all the tests have finished, and could be used to disconnect from a database. beforeEach runs before every test, and could be used to initialize values that may have changed because of another test. afterEach runs after every test, and could be used similarly to beforeEach to reset values or delete an entry to the database.


1. What is the point of Test Driven Development? What do you personally think about this approach? -- Test driven development makes the programmer think about what they want their code to do, and also helps future developers know what the code should do if they pick up your project. I think this is a good approach to be used with large-scale software because it will be worth the effort to have a solid product, when otherwise it might be impossible to test manually.


1. What is a mock function? How do we use it to test a callback passed to a function? -- A mock function is a copy of another function in the code, but it is contained within the test so it has no side-effects on the program. Since callbacks are just calls to a function, we can pass mock function to test callbacks and tell the test to expect what the mock function is supposed to return.


1. Mention three types of tests. -- Unit tests, Component tests, Snapshot tests


1. What type of test performs database operations against a real server. -- Integration test

<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
* BeforeAll, afterAll, beforeEach, and afterEach are all global methods in the Jest arsenal. Below is a brief breakdown and description of each:
* beforeAll runs before any of the tests in the file, and ensures that the database is set up before tests run. 
* afterAll runs after all of the tests in the file, and can be used to clean up your setup state. Both beforeAll and afterAll have a default timeout of 5 seconds before aborting, but you can set a different timeout as needed. 
* beforeEach and afterEach run before or after each test in the file, respectively. BeforeEach can be used to reset global state that is used by many tests, and afterEach can be used to clean up a temporary state that each test created.
1. What is the point of Test Driven Development? What do you personally think about this approach?
* TDD is a way to ensure that all your code consistently continues to work as it should before and after updates. I definitely see the benefit of TDD, but it can be a bit tedious. Having said that, I will use it in the future because of the aforementioned benefits. It is also a way to protect code you have written.
1. What is a mock function? How do we use it to test a callback passed to a function?
1. Mention three types of tests.
* Unit
* Integration
* Mock
1. What type of test performs database operations against a real server.

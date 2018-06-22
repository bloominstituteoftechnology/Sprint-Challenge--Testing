1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
- beforeAll: code which needs to be executed before all test `it(...)`
- afterAll: code which needs to be executed after all test `it(...)`
- beforeEach: code which needs to be executed before each test `it(...)`
- afterEach: code which needs to be executed after each test `it(...)`

1. What is the point of Test Driven Development? What do you personally think about this approach?
- To ensure that new plan feature will be built aligning with user story

1. What is a mock function? How do we use it to test a callback passed to a function?
- Mock function is a function which is defined inside test scope, to validate the code with specific data or logic
- We can inject callback in actual code, so we can validate each line of code inside the test

1. Mention three types of tests.
- Unit test
- Integration test: use mock data, function and request 
- Component test: test if component exists
- Snapshot test: compare outputs

1. What type of test performs database operations against a real server.
- Integration test

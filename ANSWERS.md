<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
    Methods preceded with before will run the provided callback before test(s). Methods preceded with after will run the provided callback after test(s). These methods can be used to connect to the db and to keep the db clean.

2. What is the point of Test Driven Development? What do you personally think about this approach?
    TDD can be looked as a design tool because it forces you to write test(s) and then write code only to satisfy that test. It ensures that there's no unnecessary lines of code, helping keep the code base DRY. It may seem as though the workload suffers as a result, but in the end it produces code that is easy to maintain and scalable. 

3. What is a mock function? How do we use it to test a callback passed to a function?
    Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than just testing the output. You can create a mock function with jest.fn() . If no implementation is given, the mock function will return undefined when invoked.
    https://facebook.github.io/jest/docs/en/mock-function-api.html

4. Mention three types of tests.
    unit tests: Unit tests are very low level, close to the source of your application. They consist in testing individual methods and functions of the classes, components or modules used by your software. 
    
    integration tests: Integration tests verify that different modules or services used by your application work well together.
    
    snapshot tests: Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
    https://facebook.github.io/jest/docs/en/snapshot-testing.html

5. What type of test performs database operations against a real server.
    Integration tests.

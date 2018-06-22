<!-- Answers to the Short Answer Essay Questions go here -->


1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?

* beforeAll: establishes connection via mongoose to test db for integration testing. 
* afterAll: allows developer to disconnect from db after each integration test.
* beforeEach: 
* afterEach: allows developer to remove test document that was saved during the integration test to continue with testing. 
    * Differences: 
        * Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run. Jest provides helper functions to handle this. Some of those helper functions are the ones below. 
        * If you have some work you need to do repeatedly for many tests, you can use beforeEach and afterEach.
        * beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a done parameter or return a promise. 
        * In some cases, you only need to do setup once, at the beginning of a file. This can be especially bothersome when the setup is asynchronous, so you can't just do it inline. Jest provides beforeAll and afterAll to handle this situation.

    
2. What is the point of Test Driven Development? What do you personally think about this approach?

* Philosophy is (red - green - refactor)
* Meaning, you write the tests before you write the code. Helpful for guarding against regression. 
    * no code is written unless a test requires it.
    * only write enough code to make the test pass.
    * once the test passes look for opportunities to clean up test and code.

3. What is a mock function? How do we use it to test a callback passed to a function?

    * A duplicate unit of code that has no implementation. 
    * Has the same API (method names, return value type and shape must be returned) of the original unit, but has no side effects. 
    * Mocks isolate test to simplify testing. 

4. Mention three types of tests.

    * Unit testing
    * Integration testing
    * Component testing 

5. What type of test performs database operations against a real server.

    * Jest supertests



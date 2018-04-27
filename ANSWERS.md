<!-- Answers to the Short Answer Essay Questions go here -->

1.  In Mocha, what are the differences between `before`, `after`, `beforeEach`, and `afterEach`? When do they run? What are they used for?

* The before() hook runs before any tests in each describe() run block as well as the beforeEach() hook, e.g., connecting to the test server.

* The after() hook runs after all tests in each describe() run block as well as the afterEach() hook, e.g., disconnecting from the test server.

* The beforeEach() hook runs before every test in a describe() block.

* The afterEach() hook runs after every test in a describe() block.

* The purpose of these hooks is to establish preconditions and clean up after your tests are run.

2.  What is the point of Test Driven Development? What do you personally think about this approach?

* TDD is an approach where developers write test for their code usually before actually writing the actual code. Proponents of TDD argue that it allows one to think through and understand the code that needs to be written before actually doing it. They say it is more efficient in that it reduces development time because there will be less errors in the given project's codebase from the start.

* I personally think that despite this process being very tedious, it has significant benefits, This is especially so for new developers who need to understand what code to write for their programs.

3.  What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?

* Sinon spies are used to watch functions, gather information about function calls report back on how they are called. They effectively test the verification of a callback and let the developer know if a function was correctly called or not.
